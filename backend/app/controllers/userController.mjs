import User from "../models/user.mjs";
import config from "../../config/config.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function register(req, res) {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (await User.findOne({ where: { email: req.body.email } })) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { register, login };
