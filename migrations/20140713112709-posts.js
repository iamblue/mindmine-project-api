module.exports = {
  up: function(migration, DataTypes, done){
    migration.createTable('posts', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.STRING
      },
      categoryId: {
        type: DataTypes.BIGINT
      },
      rightContent: {
        type: DataTypes.TEXT
      },
      rightContentConfig: {
        type: DataTypes.TEXT
      },
      leftContent: {
        type: DataTypes.TEXT
      },
      leftContentConfig: {
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