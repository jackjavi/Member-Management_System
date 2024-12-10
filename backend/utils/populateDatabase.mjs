import bcrypt from "bcrypt";
import config from "../config/config.mjs";
import { ActivityLog, Role, User } from "../app/models/index.mjs";

async function populateDatabase() {
  // Create roles if they don't exist
  const roles = [{ name: "user" }, { name: "admin" }];

  for (const role of roles) {
    await Role.findOrCreate({
      where: { name: role.name },
      defaults: role,
    });
  }

  // Create activity logs if they don't exist
  const activities = [
    { action: "create", description: "Created a new user" },
    { action: "read", description: "Viewed a resource" },
    { action: "update", description: "Updated a resource" },
    { action: "delete", description: "Deleted a resource" },
    { action: "login", description: "User logged in" },
    { action: "logout", description: "User logged out" },
    { action: "register", description: "User registered" },
    {
      action: "forgot-password",
      description: "User requested a password reset",
    },
    { action: "reset-password", description: "User reset their password" },
    { action: "change-password", description: "User changed their password" },
    { action: "change-email", description: "User changed their email" },
    { action: "create-member", description: "User created Member" },
    { action: "edit-profile", description: "User edited profile" },
    { action: "edit-user-role", description: "Admin edited user role" },
    { action: "delete-user", description: "Admin deleted user" },
  ];

  for (const activity of activities) {
    await ActivityLog.findOrCreate({
      where: { action: activity.action },
      defaults: activity,
    });
  }

  // Create the admin user
  const adminRole = await Role.findOne({ where: { name: "admin" } });

  const adminEmail = config.ADMIN_EMAIL;
  const adminPassword = config.ADMIN_PASSWORD;
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const [adminUser, created] = await User.findOrCreate({
    where: { email: adminEmail },
    defaults: {
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  if (created) {
    console.log("Admin user created successfully.");
  } else {
    console.log("Admin user already exists.");
  }
}

export default populateDatabase;
