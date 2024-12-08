import express from "express";
import {
  login,
  register,
  verifyToken,
  getUsersDetails,
  deleteUser,
} from "../controllers/userController.mjs";
import isAuth from "../middlewares/isAuthenticated.mjs";
import isAdmin from "../middlewares/isAdmin.mjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-token", isAuth, verifyToken);
router.get("/details", isAuth, isAdmin, getUsersDetails);
router.delete("/delete/:id", deleteUser);

export default router;
