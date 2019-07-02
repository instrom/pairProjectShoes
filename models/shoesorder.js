'use strict';
module.exports = (sequelize, DataTypes) => {
  class ShoesOrder extends sequelize.Sequelize.Model {
    static associate(models){
      ShoesOrder.belongsTo(models.Shoe)
      ShoesOrder.belongsTo(models.Order)
    }
  }
  ShoesOrder.init({
    OrderId: DataTypes.INTEGER,
    ShoeId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    // options
  });
  return ShoesOrder;
};