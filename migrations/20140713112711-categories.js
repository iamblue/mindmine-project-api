module.exports = {
  up: function(migration, DataTypes, done){
    migration.createTable('categories', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      categoryName: {
        type: DataTypes.STRING
      },
      topicId: {
        type:DataTypes.BIGINT,
        allowNull: false
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