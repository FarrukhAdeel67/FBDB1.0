'use strict';
const {DataTypes} = require("sequelize")

module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.createTable('products',  {
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
        createdAt: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      });
  },

   down (queryInterface, Sequelize) {
  
      return queryInterface.dropTable('products');
     
  }
};
