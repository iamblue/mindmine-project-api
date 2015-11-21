var Msgpools = sequelize.define('msgpools', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.STRING
  },
  content: {
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

module.exports = Msgpools;
