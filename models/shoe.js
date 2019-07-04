'use strict';
module.exports = (sequelize, DataTypes) => {
  class Shoe extends sequelize.Sequelize.Model {
    static associate(models){
      Shoe.belongsToMany(models.Order,{through: 'ShoesOrders'})
      Shoe.belongsToMany(models.User,{through: 'ShoesUsers'})
    }

    productStatus(){
      const now = new Date()
      if(now - this.createdAt < 6.048e+8){
        return 'New Product'
      }
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