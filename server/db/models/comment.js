import { DataTypes } from 'sequelize';

const Comment = (sequelize) => {
  const Comment = sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM('touched', 'untouched'),
      defaultValue: 'untouched',
    },
  });

  Comment.associate = function (models) {
    Comment.belongsTo(models.user);
    Comment.belongsTo(models.item);
  };

  return Comment;
};

export default Comment;
