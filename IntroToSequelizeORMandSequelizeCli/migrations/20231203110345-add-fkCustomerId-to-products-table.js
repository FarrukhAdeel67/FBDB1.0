"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("products", "fkCustomerId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "id",
      references: {
        model: "customers",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn("products", "fkCustomerId");
  },
};
