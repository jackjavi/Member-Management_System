import express from "express";
import sequelize from "./utils/database.mjs";
import appRoutes from "./app/app.mjs";
import config from "./config/config.mjs";

const app = express();
const PORT = config.PORT;

// App Routes
appRoutes(app);

// Sync Database and Start Server
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
