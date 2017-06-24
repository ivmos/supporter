import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import debug from 'debug';
import bcrypt from 'promised-bcrypt';
import APIError from '../helpers/APIError';

const AgentSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  createdTime: {
    type: Date,
    default: Date.now
  }
});

AgentSchema.pre('save', (next) => { // eslint-disable-line consistent-return
  const agent = this;
  if (!agent.isModified('password')) return next();

  bcrypt.genSalt(10)
    .catch(debug.err('Error generating salt'))
    .then(salt => bcrypt.hash(agent.password, salt))
    .then((hash) => { agent.password = hash; next(); });
});

AgentSchema.method('comparePassword', (candidatePassword) => {
  const agent = this;
  return bcrypt.compare(candidatePassword, agent.password);
});

AgentSchema.statics = {
  get(email, password) {
    return this.findOne({ email })
      .exec()
      .then((agent) => {
        if (agent.comparePassowrd(password)) {
          return Promise.resolve(agent);
        }
        const err = new APIError('No such agent exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

export default mongoose.model('Agent', AgentSchema);
