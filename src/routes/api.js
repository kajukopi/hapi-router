const Boom = require('@hapi/boom')
const User = require('../models/user')
const routes = [
  {
    method: 'GET',
    path: '/api/get',
    handler: async function () {
      try {
        const users = await User.find().lean()
        if (!users) return Boom.notFound('Empty', users)
        return users;
      } catch (error) {
        return error;
      }
    }
  },

  {
    method: 'GET',
    path: '/api/get/{id}',
    handler: async function (request, h) {
      const { id } = request.params
      try {
        const user = await User.findById(id).lean()
        if (!user) return Boom.notFound('User not found!', user)
        return user;
      } catch (error) {
        return Boom.badImplementation('Failed to get user by id.', error);
      }
    }
  },

  {
    method: 'POST',
    path: '/api/post',
    handler: async function (request, h) {
      const { payload } = request
      try {
        const newUser = new User(payload)
        const user = await newUser.save()
        if (!user) return Boom.notFound('User not found!', user)
        return user;
      } catch (error) {
        return Boom.badImplementation('Failed to delete user', error);
      }
    }
  },

  {
    method: 'PUT',
    path: '/api/update/{id}',
    handler: async function (request, h) {
      const { payload, params } = request
      const id = params.id
      try {
        const user = await User.findByIdAndUpdate(id, payload, { new: true })
        if (!user) return Boom.notFound('User not found!', user)
        return user;
      } catch (error) {
        return Boom.badImplementation('Failed to update user', error);
      }
    }
  },

  {
    method: 'DELETE',
    path: '/api/delete/{id}',
    handler: async function (request, h) {
      const { params } = request
      try {
        const user = await User.findByIdAndDelete(params.id);
        if (!user) return Boom.notFound('User not found!', user)
        return user;
      } catch (error) {
        return Boom.badImplementation('Failed to delete user', error);
      }
    }
  },
]
module.exports = routes