module.exports = {
  up: function(migration, DataTypes, done){
    migration.createTable('users', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.TEXT
      },
      password: {
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