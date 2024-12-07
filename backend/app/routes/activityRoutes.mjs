import express from "express";
import {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  linkActivityToUser,
  getUserActivities,
  viewSystemWideLogs,
} from "../controllers/activityController.mjs";

const router = express.Router();

router.post("/activities", createActivity);
router.get("/activities", getAllActivities);
router.get("/activities/:id", getActivityById);
router.put("/activities/:id", updateActivity);
router.delete("/activities/:id", deleteActivity);
router.post("/user-activities", linkActivityToUser);
router.get("/users/:userId/activities", getUserActivities);
router.get("/system-logs", viewSystemWideLogs);

export default router;
