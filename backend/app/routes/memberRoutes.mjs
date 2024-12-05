import express from "express";
import { createMember } from "../controllers/memberController.mjs";
import isAuth from "../middlewares/isAuthenticated.mjs";
import upload from "../../utils/multer.mjs";

const router = express.Router();

router.post("/create", isAuth, upload.single("file"), createMember);

export default router;
