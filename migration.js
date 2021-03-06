var config = require('./config');
var fs, mkdirp, migrationPath, Sequelize, migratorOptions, getSequelize, sequelize, migrator, migrate, goMigration;
fs = require('fs');
mkdirp = require('mkdirp');
migrationPath = process.cwd() + '/migrations';
Sequelize = require('sequelize');
migratorOptions = {
  path: migrationPath
};
getSequelize = function(){
  var db, password, username, dialect, port, options;
  db = 'mindminemain';
  password = config.password || null;
  username = config.username || null;
  dialect = config.dialect || 'mysql';
  port = config.port || 3306;
  options = {
    host: '52.32.139.20',
    dialect: dialect,
    port: port
  } || {};
  return new Sequelize(db, username, password, options);
};
sequelize = getSequelize();
migrator = sequelize.getMigrator(migratorOptions);
migrate = function(){
  return sequelize.migrate().success(function(){
  }).error(function(err){
    return console.log(err);
  });
};
goMigration = function(filepath){
  return fs.exists(filepath, function(exists){
    if (exists) {
      return migrate().success(function(d){
      });
    }
  });
};
goMigration(migratorOptions.path);
