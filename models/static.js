var staticFrame = sequelize.define('staticframes', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true
  },
  userid: {
    type: Sequelize.STRING,
  },
  data: {
    type: Sequelize.TEXT,
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

module.exports = staticFrame;