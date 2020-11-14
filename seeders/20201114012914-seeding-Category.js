'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        name: 'Sepatu Futsal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sepatu Sepakbola',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sepatu Casual',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Categories', data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
