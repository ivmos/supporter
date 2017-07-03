import Joi from 'joi';

export default {
  loged: {
    body: {
    }
  },
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
    }
  },
  register: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
      name: Joi.string().required(),
      lastName: Joi.string().required()
    }
  }
};
