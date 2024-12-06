import { Model, DataTypes } from "sequelize";
import sequelize from "../../utils/database.mjs";

class UserActivity extends Model {}

UserActivity.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "UserActivity",
    timestamps: false,
  }
);

export default UserActivity;
