import mongoose from 'mongoose';
import debug from 'debug';
import bcrypt from 'promised-bcrypt';

const AgentSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true, sparse: true }
  },
  createdTime: {
    type: Date,
    default: Date.now
  }
});

AgentSchema.pre('save', function result(next) { // eslint-disable-line consistent-return
  const agent = this;
  if (agent !== undefined && !agent.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(agent.password, salt))
    .then((hash) => { agent.password = hash; next(); })
    .catch(error => debug.log(error));
});

AgentSchema.statics = {
  getByEmail(email, password) {
    let agentResult;
    return this.findOne({ 'email': email }) // eslint-disable-line quote-props
      .then((agent) => { agentResult = agent; })
      .then(() => bcrypt.compare(password, agentResult.password))
      .then(passwordMatches => passwordMatches ? agentResult : false) // eslint-disable-line no-confusing-arrow, max-len
      .catch(error => error);
  }
};

export default mongoose.model('Agent', AgentSchema);
