import bcrypt from "bcrypt";
import { Role, User, ActivityLog } from "../app/models/index.mjs";
import logUserActivity from "../utils/logUserActivity.mjs";

async function seedUsers() {
  try {
    // Fetch roles and ensure the "register" activity exists
    const seededRoles = await Role.findAll();
    const registerActivity = await ActivityLog.findOne({
      where: { action: "register" },
    });

    if (!registerActivity) {
      throw new Error('Activity "register" not found in ActivityLog table.');
    }

    const userRole = seededRoles.find((role) => role.name === "user");
    const adminRole = seededRoles.find((role) => role.name === "admin");

    const hashedPasswords = await Promise.all([
      bcrypt.hash("password123", 10),
      bcrypt.hash("adminpassword", 10),
      bcrypt.hash("userpassword", 10),
      bcrypt.hash("testpassword", 10),
      bcrypt.hash("anotherpassword", 10),
    ]);

    // Define users to be created
    const users = [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        password: hashedPasswords[0],
        roleId: userRole.id,
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPasswords[1],
        roleId: adminRole.id,
      },
      {
        name: "Regular User",
        email: "regularUser@gmail.com",
        password: hashedPasswords[2],
        roleId: userRole.id,
      },
      {
        name: "Test User",
        email: "testUser@gmail.com",
        password: hashedPasswords[3],
        roleId: userRole.id,
      },
      {
        name: "Another User",
        email: "anotherUser@gmail.com",
        password: hashedPasswords[4],
        roleId: userRole.id,
      },
    ];

    // Bulk create users and fetch them
    const createdUsers = await User.bulkCreate(users, { returning: true });

    // Log the registration activity for each user
    for (const user of createdUsers) {
      await logUserActivity(user.id, "register");
    }

    console.log(
      "Roles, users, and UserActivity seed data inserted successfully!"
    );
  } catch (error) {
    console.error("Error seeding users:", error.message);
  }
}

seedUsers().then(() => process.exit());

export default seedUsers;
