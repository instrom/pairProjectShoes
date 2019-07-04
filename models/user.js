'use strict';

const bcrypt = require('bcrypt')
const saltRounds = 10
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate(models){
      User.hasMany(models.Order)
      User.belongsToMany(models.Shoe, {through: 'ShoesUsers'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'email format is wrong'
        }
      },
      unique: true,
    },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    balance: DataTypes.INTEGER,
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    // options
  });

  // // User.beforeCreate((user, options) => {
  // //   return User.findAll({
  // //     where: {
  // //       email: user.email
  // //     }
  // //   })
  // //       .then((dataEmail) => {
  // //         if(dataEmail) {
  // //           throw new Error(`email has already been used`)
  // //         }
  // //       })
  // // });

  // User.beforeCreate((user,options) => {
  //   return User.findAll({where: {username:user.username}})
  //     .then((dataUsername) => {
  //       if(dataUsername) {
  //         throw new Error(`username has already been used`)
  //       }
  //     })
  // })

  User.beforeCreate((user,options) => {
    var hash = bcrypt.hashSync(user.password, saltRounds);
    user.password = hash
  })
 
  return User;
};