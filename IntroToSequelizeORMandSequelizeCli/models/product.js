const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const moment = require("moment")
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
        fkCustomerId:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        quantity:{
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue:0
        },
        createdAt: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      });
      Product.beforeCreate((product)=>{
        product.dataValues.createdAt = moment().unix();
        product.dataValues.updatedAt = moment().unix();
      });
      Product.beforeUpdate((product)=>{
        product.dataValues.updatedAt = moment().unix();
      });
      Product.associate = ((models)=>{
        Product.belongsTo(models.customers, {
            foreignKey: "fkCustomerId",
            as: "customer",
          }); 
    })
      
      return Product;
}

