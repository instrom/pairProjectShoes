'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class ShoesUser extends Model {
    static associate(models) {
     ShoesUser.belongsTo(models.Shoe)
     ShoesUser.belongsTo(models.User)
    }
  }
  ShoesUser.init({
    UserId: DataTypes.INTEGER,
    ShoeId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  },{
    sequelize
  })
  return ShoesUser;
};