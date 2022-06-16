const sequelize = require('../config/connection');
const { Model, Datatype } = require(sequelize);

class Comment extends Model{}

Comment.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        comment: {
          type: DataTypes.STRING,
          validate: {
            len: [3],
          },
        },
        date_created: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        date_updated: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        blog_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "blog",
            key: "id",
          },
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "user",
            key: "id",
          },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: "comment",
    }
)

module.exports = Comment;