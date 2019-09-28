const ip = require('ip');

module.exports = {
  port: 8080,
  host: ip.address(),
  domain: 'http://192.168.0.100:8080',
  static: 'C:\\projects\\pet_life',
  database: {
    type: 'mysql',
    host: 'eu-cdbr-west-02.cleardb.net',
    port: 3306,
    username: 'b762c0e5b1919d',
    password: '039786a4',
    database: 'heroku_311563abd958ad8',
    synchronize: true,
    entities: ['./src/entities/*.ts']
  },
  secret: 'jwt-secret',
  expire_access: '0.5h',
  expire_refresh: '30d'
};
