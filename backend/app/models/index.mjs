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
  through: UserActivity,
  foreignKey: "userId",
  as: "activities",
});
ActivityLog.belongsToMany(User, {
  through: UserActivity,
  foreignKey: "activityId",
  as: "users",
});

export { User, Role, Member, ActivityLog, UserActivity };
