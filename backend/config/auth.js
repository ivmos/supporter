import jwt from 'express-jwt';
import config from './config';

export default {
  securize(app) {
    app.use(jwt({ secret: config.jwtSecret, requestProperty: 'agent' }).unless({ path: ['/health-check', '/agent/login'], ext: ['ico'] }));
    app.use((err, req, res) => {
      if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
      }
    });
  }
};
