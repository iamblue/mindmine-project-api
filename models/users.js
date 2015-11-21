var Users = sequelize.define('users', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.TEXT
  },
  password: {
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

module.exports = Users;
