import { DataTypes } from 'sequelize';

const Item = (sequelize) => {
  const Item = sequelize.define('item', {
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
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Item.associate = function (models) {
    Item.hasMany(models.comment, { onDelete: 'cascade' });
    Item.hasMany(models.like, { onDelete: 'cascade' });
    Item.belongsTo(models.collection);
    Item.belongsToMany(models.tag, {
      through: 'item_tag',
      onDelete: 'cascade',
    });
  };

  return Item;
};

export default Item;
