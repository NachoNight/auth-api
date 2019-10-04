const Sequelize = require('sequelize');
const { database, server } = require('../config');
const { resolve } = require('path');
const { readFileSync } = require('fs');

const connect = () => {
  const { name, username, password, host, dialect, port } = database;
  const config = {
    host,
    dialect,
    port,
    logging: false,
  };
  if (server.environment === 'staging') {config.dialectOptions = database[env].dialectOptions};
  return new Sequelize(name, username, password, config);
};

module.exports = connect();
