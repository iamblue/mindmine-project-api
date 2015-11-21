var Categories = sequelize.define('topics', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true
  },
  topicName: {
    type: Sequelize.STRING(100)
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

module.exports = Categories;
