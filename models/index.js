const Blog = require('./blog')
const User = require('./user')
const Comment = require('./Comment');

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})


User.hasMany(blog, {
    foreignkey: 'user_id',
    onDelete: 'CASCADE'
})

Blog.belongsTo(User,{
    foreignKey: 'user_id',
})

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
})

Comment.belongTo(Blog, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
})

module.exports= {User, Blog, Comment};