'use strict';
module.exports = (sequelize, DataTypes) => {
  class Shoe extends sequelize.Sequelize.Model {
    static associate(models){
      Shoe.belongsToMany(models.Order,{through: 'ShoesOrders'} )
      Shoe.belongsTo(models.User)
    }
  }
  Shoe.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    // options
  });

  return Shoe;
};