module.exports = {
  port: process.env.PORT || 8080,
  host: '0.0.0.0',
  domain: 'http://192.168.0.100:8080',
  static: 'C:\\projects\\pet_life',
  database: {
    type: 'mysql',
    host: 'eu-cdbr-west-02.cleardb.net',
    port: 3306,
    username: 'b762c0e5b1919d',
    password: '039786a4',
    database: 'heroku_311563abd958ad8',
    synchronize: false,
    entities: ['./build/entities/*.js'],
  },
  secret: 'jwt-secret',
  expire_access: '0.5h',
  expire_refresh: '30d',
};
