'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
        User.belongsToMany(models.Article, { through: 'ArticleUser' });

        User.hasMany(models.Article, {
          foreignKey: 'autherId',
          as: 'articles'
        });

        User.hasMany(models.Comment, {
          foreignKey: 'userId', 
          as: 'comments'
        });
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};