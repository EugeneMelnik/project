module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('users');

    if (!table.isOnline) {
      await queryInterface.addColumn('users', 'isOnline', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable('users');

    if (table.isOnline) {
      await queryInterface.removeColumn('users', 'isOnline');
    }
  },
};
