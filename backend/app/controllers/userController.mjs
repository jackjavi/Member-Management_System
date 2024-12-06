import { Member, User, Role, UserActivity } from "../models/index.mjs";
import logUserActivity from "../../utils/logUserActivity.mjs";
import config from "../../config/config.mjs";
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

    res.status(200).json({ token });
  } catch (error) {
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

    await logUserActivity(user.id, "login");

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role?.name,
        profilePicture: user.member?.profilePicture,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: "Unauthorized", details: error.message });
  }
}

export { register, login, verifyToken };
