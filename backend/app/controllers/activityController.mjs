import { ActivityLog, UserActivity, User, Role } from "../models/index.mjs";

// Create a new activity
async function createActivity(req, res) {
  try {
    const { action, description } = req.body;

    if (!action) {
      return res.status(400).json({ error: "Action is required" });
    }

    const activity = await ActivityLog.create({ action, description });
    res.status(201).json({ activity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all activities
async function getAllActivities(req, res) {
  try {
    const activities = await ActivityLog.findAll();
    res.status(200).json({ activities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a specific activity by ID
async function getActivityById(req, res) {
  try {
    const { id } = req.params;
    const activity = await ActivityLog.findByPk(id);

    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.status(200).json({ activity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update an activity
async function updateActivity(req, res) {
  try {
    const { id } = req.params;
    const { action, description } = req.body;

    const activity = await ActivityLog.findByPk(id);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    await activity.update({ action, description });
    res.status(200).json({ activity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete an activity
async function deleteActivity(req, res) {
  try {
    const { id } = req.params;

    const activity = await ActivityLog.findByPk(id);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    await activity.destroy();
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Link an activity to a user
async function linkActivityToUser(req, res) {
  try {
    const { userId, activityId } = req.body;

    const user = await User.findByPk(userId);
    const activity = await ActivityLog.findByPk(activityId);

    if (!user || !activity) {
      return res.status(404).json({ error: "User or Activity not found" });
    }

    const userActivity = await UserActivity.create({
      userId,
      activityId,
    });

    res.status(201).json({ userActivity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all activities linked to a specific user
async function getUserActivities(req, res) {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: {
        model: ActivityLog,
        as: "activities",
        through: { attributes: [] }, // Exclude intermediate table data
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ activities: user.activities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function viewSystemWideLogs(req, res) {
  try {
    const { userId } = req; // Assume this is populated from authentication middleware
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 results per page
    const offset = (page - 1) * limit;

    // Fetch the authenticated user's role
    const user = await User.findByPk(userId, {
      include: {
        model: Role,
        as: "role",
        attributes: ["name"],
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userRole = user.role.name; // Assuming the role name is stored here

    // Determine the query filter based on the role
    const whereClause = userRole === "admin" ? {} : { userId };

    // Fetch logs with pagination and the appropriate filter
    const { count, rows: logs } = await UserActivity.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: ActivityLog,
          attributes: ["action", "description"],
        },
        {
          model: User,
          attributes: ["id", "name", "email"],
          include: {
            model: Role,
            as: "role",
            attributes: ["name"],
          },
        },
      ],
      attributes: ["timestamp"],
      limit,
      offset,
    });

    res.status(200).json({
      logs,
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error("Error viewing system-wide logs:", error);
    res.status(500).json({ error: error.message });
  }
}

export {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  linkActivityToUser,
  getUserActivities,
  viewSystemWideLogs,
};
