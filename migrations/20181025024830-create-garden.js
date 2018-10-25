'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Gardens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      photoUrl: {
        type: Sequelize.STRING
      },
      shortDescription: {
        type: Sequelize.TEXT
      },
      address: {
        type: Sequelize.STRING
      },
      crossStreet: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.STRING
      },
      neighborhood: {
        type: Sequelize.STRING
      },
      managedBy: {
        type: Sequelize.STRING
      },
      openHours: {
        type: Sequelize.TEXT
      },
      contactEmail: {
        type: Sequelize.STRING
      },
      contactPhone: {
        type: Sequelize.STRING
      },
      contactLink: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Gardens');
  }
};