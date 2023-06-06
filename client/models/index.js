const User = require('./User');
const Post = require('./Post');

// Define model associations
User.hasMany(Post, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'user_id' });

// Export the models
module.exports = { User, Post };
