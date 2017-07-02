import redis from 'redis';

const debug = require('debug')('api:redis');

const client = redis.createClient();

client.on('connect', () => {
  debug('connected');
});

const TokenClient = class TokenClient {
  static saveToken(key, value) {
    debug(`Saving ${key} ${value}`);
    client.set(key, value);
  }
};

export default TokenClient;
