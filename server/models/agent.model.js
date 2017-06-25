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
    return this.findOne({ 'email': email }) // eslint-disable-line 
      .then(agent => bcrypt.compare(password, agent.password))
      .then(passwordMatches => passwordMatches)
      .catch((error) => { console.log(error); return {}; });
  }
};

export default mongoose.model('Agent', AgentSchema);
