'use strict';
const {DataTypes} = require("sequelize")

module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.createTable('customers',   {
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password:{
          type: DataTypes.STRING,
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
  
      return queryInterface.dropTable('customers');
     
  }
};
