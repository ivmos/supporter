import jwt from 'jsonwebtoken';

import config from '../../config/config.js';
import APIError from '../helpers/APIError';
import APISuccess from '../helpers/APISuccess';
import Agent from '../models/agent.model';
import TokenClient from '../../config/token.js';

function register(req, res) {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  const newAgent = new Agent({ password, name, lastname, email });
  newAgent
    .save()
    .then(() => {
      res.send(new APISuccess());
    }).catch((error) => {
      res.send(new APIError(`Error creating agent: ${error.msg}`));
    });
}

function login(req, res) {
  Agent.getByEmail(req.body.email, req.body.password)
    .then((agent) => {
      const agentToReturn = { name: agent.name, lastName: agent.lastname, email: agent.email };
      const token = jwt.sign(agentToReturn, config.jwtSecret);
      TokenClient.saveToken(agent.email, token);
      res.send(new APISuccess(token));
    }).catch((error) => {
      res.send(new APIError(`Incorrect login: ${error.msg}`));
    });
}

function loged(req, res) {
  res.send(true);
}

export default { login, register, loged };
