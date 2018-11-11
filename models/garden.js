'use strict';
module.exports = (sequelize, DataTypes) => {
  const Garden = sequelize.define('Garden', {
    name: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    address: DataTypes.STRING,
    crossStreet: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    managedBy: DataTypes.STRING,
    openHours: DataTypes.TEXT,
    contactEmail: DataTypes.STRING,
    contactPhone: DataTypes.STRING,
    contactLink: DataTypes.STRING
  }, {});
  Garden.associate = function(models) {
    // associations can be defined here
  };
  return Garden;
};
