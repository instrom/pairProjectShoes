'use strict';
module.exports = (sequelize, DataTypes) => {
  class Shoe extends sequelize.Sequelize.Model {
    static associate(models){
      Shoe.belongsToMany(models.Order,{through: 'ShoesOrders'})
      Shoe.belongsToMany(models.User,{through: 'ShoesUsers'})
    }
  }
  Shoe.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    // options
  });

  return Shoe;
};