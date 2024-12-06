import { ActivityLog, UserActivity } from "../app/models/index.mjs";

async function logUserActivity(userId, action) {
  try {
    const activity = await ActivityLog.findOne({ where: { action } });
    if (!activity) {
      throw new Error(`Activity "${action}" not found`);
    }

    await UserActivity.create({
      userId,
      activityId: activity.id,
    });

    console.log(`Logged activity: ${action} for userId: ${userId}`);
  } catch (error) {
    console.error("Error logging user activity:", error.message);
  }
}

export default logUserActivity;
