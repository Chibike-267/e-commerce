import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { ProductInstance } from "./productModel";

export interface UserAttributes {
  id: string;
  email: string;
  firstName: string;
  password: string;
  gender: string;
  phone: number;
  address: string;
}

export class UserInstance extends Model<UserAttributes> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, tableName: "user" }
);

UserInstance.hasMany(ProductInstance, {foreignKey: 'userId', as: 'products'});
ProductInstance.belongsTo(UserInstance, {foreignKey: 'userId', as: 'user'});
