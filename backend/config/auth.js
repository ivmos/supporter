import jwt from 'express-jwt';
import config from './config';

const auth = {
  secure() {
    return jwt({
      secret: config.jwtSecret,
      getToken: req => req.headers.token
    }).unless(() => (
      {
        path: ['/', '/health-check', '/agent/register', '/agent/login'],
        ext: ['ico']
      }
    ));
  }
};

export default auth.secure;
