const fs = require('fs');
const path = require('path');
const dev = require('./dev.js');
const prod = require('./prod.js');
const test = require('./test.js');

const config = path.join(`${__dirname}/../server.config.json`);
const isProd = process.argv.some(val => val === '--prod');
const isTest = process.argv.some(val => val === '--test');
const isDev = process.argv.some(val => val === '--dev');

const write = (env, type) => {
  fs.writeFile(config, JSON.stringify(env, null, 2), err => {
    if (err) throw err;
    console.log(`> Environments setup as ${type}`);
  });
};

if (isDev) {
  write(dev, 'development');
}

if (isProd) {
  write(prod, 'production');
}

if (isTest) {
  write(test, 'test');
}
