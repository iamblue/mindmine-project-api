module.exports = {
  up: function(migration, DataTypes, done){
    migration.createTable('topics', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true
      },
      topicName: {
        type: DataTypes.STRING
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
