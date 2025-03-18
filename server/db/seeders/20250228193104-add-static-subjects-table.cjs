module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('subjects', [
      { id: 1, value: 'memories' },
      { id: 2, value: 'movies' },
      { id: 3, value: 'bands' },
      { id: 4, value: 'artworks' },
      { id: 5, value: 'books' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('subjects', null, {});
  },
};
