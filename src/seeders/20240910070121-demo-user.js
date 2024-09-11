'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    // npx sequelize-cli db:seed:all
    await queryInterface.bulkInsert('Users', [
      {
      email: 'dinhlequangtrieu@gmail.com',
      password: '123456',
      username: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      email: 'dinhlequangtrieu1@gmail.com',
      password: '123456',
      username: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      email: 'dinhlequangtrieu2@gmail.com',
      password: '123456',
      username: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
