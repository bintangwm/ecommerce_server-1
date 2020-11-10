'use strict';
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(+process.env.SALT)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
        'Users',
        [{
          email: 'admin@mail.com',
          password: bcrypt.hashSync('1234', salt),
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        }]
      )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null)
  }
};
