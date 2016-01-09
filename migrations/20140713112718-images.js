module.exports = {
  up: function(migration, DataTypes, done){
    migration.createTable('images', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      albumId: {
        type: DataTypes.STRING
      },
      imageUrlId: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.TEXT
      },
      description: {
        type: DataTypes.TEXT
      },
      status: {
        type: DataTypes.BOOLEAN
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: 'NOW()'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: 'NOW()'
      }
    }, {
      charset: 'utf8'
    });
    done();
  },
  down: function(migration, DataTypes, done){
    done();
  }
};