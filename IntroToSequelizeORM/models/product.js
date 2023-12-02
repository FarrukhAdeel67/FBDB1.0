const sequelize = require("./index");
const { DataTypes } = require("sequelize");

module.exports =(sequelize,DataTypes)=> {
    const Product = sequelize.define("products", {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique:true,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        quantity:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      });
      return Product;
}

