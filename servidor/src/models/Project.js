const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('project', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPFjlLQscjGBEFJm2nvByQu_-vOs3TjDcnQA&s',
    },
    techs: {
      type: DataTypes.STRING,
      defaultValue: 'Unkown',
    },
    collaborators: {
      type: DataTypes.STRING,
      defaultValue: 'Unkown',
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: 'Web project',
    },
    publicationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('complete', 'incomplete', 'abandoned'),
      defaultValue: 'complete',
    }
  }, {
    timestamps: false,
  });
};