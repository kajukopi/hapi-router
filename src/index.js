'use strict';

const { start, init } = require('./server');

init().then((server) => {
  server.listener.listen(3000, '0.0.0.0', () => {
    console.log(`Server running at: ${server.info.uri} || ${server.info.host} || ${server.info.port}`);
  })
})
