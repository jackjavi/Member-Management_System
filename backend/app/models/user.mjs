import { Model, DataTypes } from "sequelize";
import sequelize from "../../utils/database.mjs";

class User extends Model {}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "User", timestamps: true }
);

export default User;
