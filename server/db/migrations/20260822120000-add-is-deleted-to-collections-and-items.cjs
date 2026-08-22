module.exports = {
  async up(queryInterface, Sequelize) {
    const collectionTable = await queryInterface.describeTable('collections');
    const itemTable = await queryInterface.describeTable('items');

    if (!collectionTable.isDeleted) {
      await queryInterface.addColumn('collections', 'isDeleted', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      });
    }

    if (!itemTable.isDeleted) {
      await queryInterface.addColumn('items', 'isDeleted', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      });
    }
  },

  async down(queryInterface) {
    const collectionTable = await queryInterface.describeTable('collections');
    const itemTable = await queryInterface.describeTable('items');

    if (collectionTable.isDeleted) await queryInterface.removeColumn('collections', 'isDeleted');
    if (itemTable.isDeleted) await queryInterface.removeColumn('items', 'isDeleted');
  },
};