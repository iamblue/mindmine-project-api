var photoFrame = sequelize.define('photoframe', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true
  },
  userid: Sequelize.STRING,
  data: Sequelize.STRING,
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
});

module.exports = photoFrame;
