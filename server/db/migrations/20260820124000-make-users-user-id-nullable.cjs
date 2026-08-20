module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('users');

    if (table.userId && !table.userId.allowNull) {
      await queryInterface.changeColumn('users', 'userId', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('users');

    if (table.userId && table.userId.allowNull) {
      await queryInterface.changeColumn('users', 'userId', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    }
  },
};
