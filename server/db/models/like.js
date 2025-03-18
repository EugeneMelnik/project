import { DataTypes } from 'sequelize';

export const Like = (sequelize) => {
  const Like = sequelize.define('like', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });

  Like.associate = function (models) {
    Like.belongsTo(models.user);
    Like.belongsTo(models.item);
  };

  return Like;
};

export default Like;
