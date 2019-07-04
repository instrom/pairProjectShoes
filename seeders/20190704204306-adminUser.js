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
      return queryInterface.bulkInsert('Users',[{
        username: 'instrom7',
        email:'tommysutjipto96@gmail.com',
        password: '$2b$10$QIbmFNLUVyO/cZoIvBfGwO8jAQbBb1RYL5bY9zhvSH8PCMWves6fa',
        isAdmin: true,
        balance: 1000000,
        confirmed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }],{})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users',null,{})
  }
};
