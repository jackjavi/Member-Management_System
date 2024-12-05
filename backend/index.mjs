import express from "express";
import sequelize from "./utils/database.mjs";
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
