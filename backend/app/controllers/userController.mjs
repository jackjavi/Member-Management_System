import { Member, User, Role, UserActivity } from "../models/index.mjs";
import logUserActivity from "../../utils/logUserActivity.mjs";
import config from "../../config/config.mjs";
import { Op, fn, col } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: "User already exists" });
    }

    let role = await Role.findOne({ where: { name: "user" } });
    if (!role) {
      role = await Role.create({ name: "user" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: username,
      email,
      password: hashedPassword,
      roleId: role.id,
    });

    console.log("username", username, "email", email, "password", password);

    await logUserActivity(user.id, "register");
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    req.userId = user.id;

    await logUserActivity(user.id, "login");

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUsersDetails(req, res) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const { role, name, email } = req.query;

    const filters = {};

    if (role) {
      filters["$role.name$"] = role;
    }
    if (name) {
      filters.name = { [Op.like]: `%${name}%` };
    }
    if (email) {
      filters.email = { [Op.like]: `%${email}%` };
    }

    const { count, rows: users } = await User.findAndCountAll({
      where: filters,
      include: [
        { model: Role, as: "role" },
        { model: Member, as: "member" },
      ],
      limit,
      offset,
    });

    const roleDistribution = await User.findAll({
      attributes: [[fn("COUNT", col("User.id")), "count"]],
      include: {
        model: Role,
        as: "role",
        attributes: ["name"],
      },
      group: ["role.name"],
    });

    const formattedRoleDistribution = roleDistribution.map((item) => ({
      role: item.role.name,
      count: item.dataValues.count,
    }));

    res.status(200).json({
      users,
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      roleDistribution: formattedRoleDistribution,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

async function verifyToken(req, res, next) {
  try {
    const user = await User.findByPk(req.userId, {
      include: [
        { model: Role, as: "role" },
        { model: Member, as: "member" },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role?.name,
        profilePicture: user.member?.profilePicture,
        dateOfBirth: user.member?.dateOfBirth,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: "Unauthorized", details: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export { register, login, verifyToken, deleteUser, getUsersDetails };
