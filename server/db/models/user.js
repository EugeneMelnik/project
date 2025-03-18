const User = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('User', 'Admin', 'Reader'),
      defaultValue: 'User',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'blocked'),
      defaultValue: 'active',
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  User.associate = function (models) {
    User.hasMany(models.collection, { onDelete: 'cascade' });
    User.hasMany(models.like, { onDelete: 'cascade' });
    User.hasMany(models.comment, { onDelete: 'cascade' });
  };

  return User;
};

export default User;
