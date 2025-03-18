import { DataTypes } from 'sequelize';

const Subject = (sequelize) => {
  const Subject = sequelize.define(
    'subject',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Subject;
};

export default Subject;
