module.exports = {
  up: function(migration, DataTypes, done){
    migration.createTable('checkfriendlists', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.STRING
      },
      sendInvitedUserId: {
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