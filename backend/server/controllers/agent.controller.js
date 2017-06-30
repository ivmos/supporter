import APIError from '../helpers/APIError';
import APISuccess from '../helpers/APISuccess';
import Agent from '../models/agent.model';

function register(req, res) {
  const username = req.body.username;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  const newAgent = new Agent({ username, password, name, lastname, email });
  newAgent
    .save()
    .then(() => {
      res.send(JSON.stringify(new APISuccess()));
    }).catch((error) => {
      res.send(JSON.stringify(new APIError('Error creating agent')));
    });
}

function login(req, res) {
  Agent.getByEmail(req.body.email, req.body.password)
    .then((agent) => {
      res.send(new APISuccess(agent));
    }).catch((error) => {
      res.send(JSON.stringify(new APIError('Incorrecct')));
    });
}

export default { login, register };
