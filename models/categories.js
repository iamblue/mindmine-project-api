var Categories = sequelize.define('categories', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true
  },
  categoryName: {
    type: Sequelize.STRING(100)
  },
  topicId: {
    type: Sequelize.BIGINT,
    allowNull: false
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
