import jwt from 'express-jwt';
import config from './config';

const auth = {
  secure() {
    return jwt({
      secret: config.jwtSecret,
      getToken: req => req.headers.token
    }).unless(req => (
      (req.originalUrl === '/health-check' && req.method === 'GET') ||
      (req.originalUrl === '/agent/register') ||
      (req.originalUrl === '/agent/login')
    ));
  }
};

export default auth.secure;
