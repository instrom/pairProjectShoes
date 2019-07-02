'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Shoes', [{
        name: 'Adidas UltraBoost',
        brand: 'Adidas',
        type: 'Running',
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Nike Flyknit',
        brand:'Nike',
        type:'Running',
        price: 180,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Air Jordan 1',
        brand:'Air Jordan',
        type:'Basketball',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'T90',
        brand: 'Nike',
        type:'Soccer',
        price: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Nike Mercurial',
        brand: 'Nike',
        type: 'Soccer',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Converse Classic',
        brand: 'Converse',
        type: 'Casual',
        price: 115,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'NMD R1',
        brand: 'Nike',
        type: 'Casual',
        price: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Predator',
        brand: 'Adidas',
        type: 'Soccer',
        price: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Shoes',null,{})
  }
};
