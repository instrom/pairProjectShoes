'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class ShoesUser extends Model {
    static associate(models) {
     ShoesUser.belongsTo(models.Shoe)
     ShoesUser.belongsTo(models.User)
    }

    static getTotalPrice(req,res){
      return ShoesUser.findAll()
      .then(data=>{
        let total = 0
        data.forEach(element => {
          total += element.dataValues.totalPrice
        });
        return total
      })
      .catch(err=>{
        res.send(err)
      })
    }
  }
  ShoesUser.init({
    UserId: DataTypes.INTEGER,
    ShoeId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  },{
    sequelize
  })
  return ShoesUser;
};