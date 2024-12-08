import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

export default config;
