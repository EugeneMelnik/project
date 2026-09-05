import { DataTypes } from 'sequelize';

const Tag = (sequelize) => {
  const Tag = sequelize.define('tag', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Tag.associate = function (models) {
    Tag.belongsToMany(models.item, {
      through: 'item_tag',
    });
  };

  return Tag;
};

export default Tag;
