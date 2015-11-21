var Posts = sequelize.define('images', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true
  },
  albumId: {
    type: Sequelize.STRING
  },
  imageUrlId: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
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
