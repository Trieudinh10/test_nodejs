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
      firstName: 'John ',
      lastName: 'Doe',
      address: 'abc',
      gender: 1,
      image: '----------',
      roleId: 'R1',
      phonenumber: '0123456789',
      positionId: 'abcdefgh',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      email: 'dinhlequangtrieu1@gmail.com',
      password: '123456',
      firstName: 'John1 ',
      lastName: 'Doe1',
      address: 'abc1',
      gender: 1,
      image: '----------',
      roleId: 'R1',
      phonenumber: '0123456789',
      positionId: 'abcdefgh',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      email: 'dinhlequangtrieu2@gmail.com',
      password: '123456',
      firstName: 'John2 ',
      lastName: 'Doe2',
      address: 'abc2',
      gender: 1,
      image: '----------',
      roleId: 'R1',
      phonenumber: '0123456789',
      positionId: 'abcdefgh',
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
