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
    username: 'b6b5e639fc8877',
    password: 'de373839',
    database: 'heroku_db68cdcc3e73c09',
    synchronize: true,
    entities: ['./src/entities/*.ts']
  },
  secret: 'jwt-secret',
  expire_access: '120',
  expire_refresh: '30d'
};
