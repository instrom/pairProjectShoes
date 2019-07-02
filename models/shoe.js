'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shoe = sequelize.define('Shoe', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Shoe.associate = function(models) {
    // associations can be defined here
  };
  return Shoe;
};