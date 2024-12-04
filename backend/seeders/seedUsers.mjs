import bcrypt from "bcrypt";
import User from "../app/models/user.mjs";
import Role from "../app/models/role.mjs";

async function seedUsers() {
  try {
    const roles = [{ name: "user" }, { name: "admin" }];

    await Role.destroy({ where: {} });
    await User.destroy({ where: {} });

    const seededRoles = await Role.bulkCreate(roles, { returning: true });

    const userRole = seededRoles.find((role) => role.name === "user");
    const adminRole = seededRoles.find((role) => role.name === "admin");

    const hashedPassword1 = await bcrypt.hash("password123", 10);
    const hashedPassword2 = await bcrypt.hash("adminpassword", 10);
    const hashedPassword3 = await bcrypt.hash("userpassword", 10);
    const hashedPassword4 = await bcrypt.hash("testpassword", 10);
    const hashedPassword5 = await bcrypt.hash("anotherpassword", 10);

    const users = [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        password: hashedPassword1,
        roleId: userRole.id,
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword2,
        roleId: adminRole.id,
      },
      {
        name: "Regular User",
        email: "regularUser@gmail.com",
        password: hashedPassword3,
        roleId: userRole.id,
      },
      {
        name: "Test User",
        email: "testUser@gmail.com",
        password: hashedPassword4,
        roleId: userRole.id,
      },
      {
        name: "Another User",
        email: "anotherUser@gmail.com",
        password: hashedPassword5,
        roleId: userRole.id,
      },
    ];

    await User.bulkCreate(users);

    console.log("Roles and user seed data inserted successfully!");
  } catch (error) {
    console.error("Error seeding users:", error.message);
  }
}

seedUsers().then(() => process.exit());

export default seedUsers;
