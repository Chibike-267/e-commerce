import { DataTypes, Model } from "sequelize";
import db from '../config/database.config'
export interface productAttributes {
  id: string,
  name: string,
  image: string,
  brand: string,
  category: string,
  description: string,
  price: number,
  countInStock: number,
  rating: number;
  numReviews: number,
  userId: string
}


export class ProductInstance extends Model<productAttributes> {}

ProductInstance.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    
 
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category:{
    type: DataTypes.STRING,
    allowNull: false, 
},
description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }, 
  countInStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numReviews: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUIDV4,
  }
},

{sequelize: db, tableName: 'products'}
);

//Relationship
//one-to-one  -belongs to
//one-to-many  -hasmany
//many-many
