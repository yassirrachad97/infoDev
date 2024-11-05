'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {

    static associate(models) {      

      Article.belongsTo(models.User, {
        foreignKey: 'autherId',
        as: 'author',
      });
      Article.hasMany(models.Comment, {
        foreignKey: 'articleId', 
        as: 'comments',
      });
    }
  
  }

  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    autherId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Author is required
    },
  }, {
    sequelize,
    modelName: 'Article',
    tableName: 'articles',
  });

  return Article;
};
