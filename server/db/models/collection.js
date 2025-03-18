import { DataTypes } from 'sequelize';

const Collection = (sequelize) => {
  const Collection = sequelize.define('collection', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    icon: {
      type: DataTypes.BLOB('medium'),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.ENUM('bands', 'artworks', 'books', 'memories', 'movies'),
      allowNull: false,
    },
  });

  Collection.associate = function (models) {
    Collection.hasMany(models.item, { onDelete: 'cascade' });
    Collection.belongsTo(models.user);
  };

  return Collection;
};

export default Collection;
