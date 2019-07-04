'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class ShoesUser extends Model {
    static associate(models) {
     ShoesUser.belongsTo(models.Shoe)
     ShoesUser.belongsTo(models.User)
    }

    // static getTotalPrice(){
    //   ShoesUser.findAll()
    //   .then(data=>{
    //     data.forEach(el=>{
          
    //     })
    //   })
    //   .catch(err=>{
    //     res.send(err)
    //   })
    // }
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