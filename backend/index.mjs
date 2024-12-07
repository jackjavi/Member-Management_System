import express from "express";
import sequelize from "./utils/database.mjs";
import { ActivityLog, Role } from "./app/models/index.mjs";
import appRoutes from "./app/app.mjs";
import config from "./config/config.mjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = config.PORT;

// Serve the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// App Routes
appRoutes(app);

// Sync Database and Start Server
sequelize
  .sync({ force: true })
  .then(async () => {
    const roles = [{ name: "user" }, { name: "admin" }];

    for (const role of roles) {
      await Role.findOrCreate({
        where: { name: role.name },
        defaults: role,
      });
    }

    const activities = [
      { action: "create", description: "Created a new resource" },
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
    ];

    for (const activity of activities) {
      await ActivityLog.findOrCreate({
        where: { action: activity.action },
        defaults: activity,
      });
    }

    console.log("Database synced successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
