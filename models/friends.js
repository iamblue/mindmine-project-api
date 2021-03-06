var Posts = sequelize.define('friends', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.STRING
  },
  invitedUserId: {
    type: Sequelize.STRING
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
