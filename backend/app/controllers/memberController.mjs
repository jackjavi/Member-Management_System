import { Member, User } from "../models/index.mjs";

async function createMember(req, res) {
  try {
    const { dateOfBirth } = req.body;

    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const memberExists = await Member.findOne({ where: { userId } });
    if (memberExists) {
      return res.status(400).json({ error: "Member already exists" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const member = await Member.create({
      userId,
      dateOfBirth,
      profilePicture: req.file ? req.file.path : null,
    });

    res.status(201).json({ member });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { createMember };
