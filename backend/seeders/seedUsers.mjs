import bcrypt from "bcrypt";
import User from "../app/models/user.mjs";

async function seedUsers() {
  try {
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
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword2,
      },
      {
        name: "Regular User",
        email: "regularUser@gmail.com",
        password: hashedPassword3,
      },
      {
        name: "Test User",
        email: "testUser@gmail.com",
        password: hashedPassword4,
      },
      {
        name: "Another User",
        email: "anotherUser@gmail.com",
        password: hashedPassword5,
      },
    ];

    // Clear existing data to prevent duplicates
    await User.destroy({ where: {} });

    // Insert users
    await User.bulkCreate(users);

    console.log("User seed data inserted successfully!");
  } catch (error) {
    console.error("Error seeding users:", error.message);
  }
}

// Run the seed function
seedUsers().then(() => process.exit());

export default seedUsers;
