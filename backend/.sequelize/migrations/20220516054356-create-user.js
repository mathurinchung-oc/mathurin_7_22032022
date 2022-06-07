'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      avatar: {
        allowNull: false,
        type: Sequelize.STRING(150),
        defaultValue: '/images/users/avatar.png'
      },
      bio: {
        allowNull: true,
        type: Sequelize.STRING
      },
      admin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};