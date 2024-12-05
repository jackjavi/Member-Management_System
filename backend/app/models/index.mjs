import User from "./user.mjs";
import Role from "./role.mjs";
import Member from "./member.mjs";

User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
User.hasOne(Member, { foreignKey: "userId", as: "member" });
Member.belongsTo(User, { foreignKey: "userId", as: "user" });
Role.hasMany(User, { foreignKey: "roleId", as: "users" });

export { User, Role, Member };
