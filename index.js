import mongoose from 'mongoose';
import util from 'util';
import config from './config/config';
import app from './config/express';

const debug = require('debug')('express-mongoose-es6-rest-api:index');

const mongoUri = config.mongo.host;
require('./config/websocket').build(app);// build websocket

mongoose.Promise = require('bluebird');

mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

if (!module.parent) {
  app.listen(config.port, () => {
  });
}

export default app;
