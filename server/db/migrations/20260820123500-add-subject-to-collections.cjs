module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('collections');

    if (!table.subject) {
      await queryInterface.addColumn('collections', 'subject', {
        type: Sequelize.ENUM('bands', 'artworks', 'books', 'memories', 'movies'),
        allowNull: false,
        defaultValue: 'memories',
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable('collections');

    if (table.subject) {
      await queryInterface.removeColumn('collections', 'subject');
    }
  },
};
