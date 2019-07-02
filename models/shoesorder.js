'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShoesOrder = sequelize.define('ShoesOrder', {
    OrderId: DataTypes.INTEGER,
    ShoeId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {});
  ShoesOrder.associate = function(models) {
    // associations can be defined here
  };
  return ShoesOrder;
};