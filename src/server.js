'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const Api = require('./routes/api')

const server = Hapi.server({
  autoListen: false,
});

server.route(Api);

exports.init = async () => {
  await mongoose.connect('mongodb://localhost:27017/hapi-db-test');
  await server.initialize();
  return server;
};

exports.start = async () => {
  await mongoose.connect('mongodb://localhost:27017/hapi-db');
  await server.start();
  return server;
};

server.events.on('start', () => {
  console.log('Server started');
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});