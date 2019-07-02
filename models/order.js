'use strict';
module.exports = (sequelize, DataTypes) => {

  class Order extends sequelize.Sequelize.Model {
    static associate(models){
      Order.belongsToMany(models.Shoe,{through: 'ShoesOrders'} )
      Order.belongsTo(models.User)
    }
  }
  Order.init({
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    // options
  });

  return Order;
};