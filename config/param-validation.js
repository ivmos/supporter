import Joi from 'joi';

export default {
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  register: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().pass
    }
  }
};
