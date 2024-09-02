'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../server');
const mongoose = require('mongoose');

let server;

beforeEach(async () => {
  server = await init();
  // console.log('Start.');
});

afterEach(async () => {
  await mongoose.connection.close()
  await server.stop();
  // console.log('Stop.\n\n');
});

describe('\n\nGET =>', () => {
  it('Get users with response 200', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/api/get'
    });
    expect(res.statusCode).to.equal(200);
    console.log(res.statusMessage);
  });

});

describe('\n\nGET BY ID =>', () => {
  it('Get user by id with response 404', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/api/get/66d51d8aae14c3247f91ccdd'
    });
    expect(res.statusCode).to.equal(404);
    console.log(res.statusMessage);
  });
})

describe('\n\nPOST =>', () => {
  it('Post user with response 200', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/api/post',
      payload: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    });
    expect(res.statusCode).to.equal(200);
    console.log(res.statusMessage);
  });
})

describe('\n\nUPDATE =>', () => {
  it('Update user by id with response 404', async () => {
    const res = await server.inject({
      method: 'put',
      url: '/api/update/66d51d8aae14c3247f91ccdd',
      payload: {
        name: 'John Doe, Mr',
        email: 'john.doe@example.com',
      },
    });
    expect(res.statusCode).to.equal(404);
    console.log(res.statusMessage);
  });
})

describe('\n\nDELETE =>', () => {
  it('Delete user by id with response 404', async () => {
    const res = await server.inject({
      method: 'delete',
      url: '/api/delete/66d51d8aae14c3247f91ccdd',
      payload: {
        name: 'John Doe, Mr',
        email: 'john.doe@example.com',
      },
    });
    expect(res.statusCode).to.equal(404);
    console.log(res.statusMessage);
  });
})