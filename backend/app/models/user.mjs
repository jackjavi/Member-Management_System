import { Model, DataTypes } from "sequelize";
import sequelize from "../../utils/database.mjs";
import Role from "./role.mjs";

class User extends Model {}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "User", timestamps: true }
);

User.belongsTo(Role, { foreignKey: "roleId" });

export default User;
