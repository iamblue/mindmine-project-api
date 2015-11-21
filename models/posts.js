var Posts = sequelize.define('posts', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.STRING
  },
  categoryId: {
    type: Sequelize.BIGINT
  },
  rightContent: {
    type: Sequelize.TEXT
  },
  rightContentConfig: {
    type: Sequelize.TEXT
  },
  leftContent: {
    type: Sequelize.TEXT
  },
  leftContentConfig: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.BOOLEAN
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: 'NOW()'
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: 'NOW()'
  }
},{
  freezeTableName: true
});

module.exports = Posts;
