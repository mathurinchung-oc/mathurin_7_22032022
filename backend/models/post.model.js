'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, { foreignKey: 'userId' });
      models.Post.hasMany(models.Like, { onDelete: 'cascade', hooks: true });
      models.Post.hasMany(models.Comment, { onDelete: 'cascade', hooks: true });
    }
  }
  Post.init({
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' }
    },
    content: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};