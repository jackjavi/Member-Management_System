import User from "./user.mjs";
import Role from "./role.mjs";
import Member from "./member.mjs";
import ActivityLog from "./ActivityLog.mjs";
import UserActivity from "./UserActivity.mjs";

User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
User.hasOne(Member, { foreignKey: "userId", as: "member" });
Member.belongsTo(User, { foreignKey: "userId", as: "user" });
Role.hasMany(User, { foreignKey: "roleId", as: "users" });
User.belongsToMany(ActivityLog, {
  through: { model: UserActivity, unique: false },
  foreignKey: "userId",
  unique: false,
});
ActivityLog.belongsToMany(User, {
  through: { model: UserActivity, unique: false },
  foreignKey: "activityLogId",
  unique: false,
});
UserActivity.belongsTo(User, { foreignKey: "userId" });
User.hasMany(UserActivity, { foreignKey: "userId" });
UserActivity.belongsTo(ActivityLog, { foreignKey: "activityLogId" });
ActivityLog.hasMany(UserActivity, { foreignKey: "activityLogId" });

export { User, Role, Member, ActivityLog, UserActivity };
