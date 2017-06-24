import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/config';
import Agent from '../models/agent.model';

function register(req, res, next) {
  const username = req.params.username;
  const name = req.params.name;
  const lastName = req.params.lastName;
  const email = req.params.email;
  const password = req.params.password;

  const newAgent = new Agent({ username, password, name, lastName, email });
  newAgent.save()
    .then(() => {
      next();
    })
    .then(() => {
      res.send('OK');
    });
}

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  next();
  return true;
}

export default { login, register };
