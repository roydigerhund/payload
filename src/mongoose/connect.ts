/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import mongoose, { ConnectOptions } from 'mongoose';
import pino from 'pino';
import { InitOptions } from '../config/types';
import { connection } from './testCredentials';

const connectMongoose = async (
  url: string,
  options: InitOptions['mongoOptions'],
  logger: pino.Logger,
): Promise<void | any> => {
  let urlToConnect = url;
  let successfulConnectionMessage = 'Connected to MongoDB server successfully!';

  const connectionOptions: ConnectOptions & { useFacet: undefined } = {
    autoIndex: true,
    ...options,
    useFacet: undefined,
  };

  let mongoMemoryServer;

  if (process.env.NODE_ENV === 'test') {
    if (process.env.PAYLOAD_TEST_MONGO_URL) {
      urlToConnect = process.env.PAYLOAD_TEST_MONGO_URL;
    } else {
      connectionOptions.dbName = 'payloadmemory';
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const getPort = require('get-port');

      const port = await getPort();
      mongoMemoryServer = await MongoMemoryServer.create({
        instance: {
          dbName: connection.name,
          port,
        },
      });

      urlToConnect = mongoMemoryServer.getUri();
      successfulConnectionMessage = 'Connected to in-memory MongoDB server successfully!';
    }

    try {
      await mongoose.connect(urlToConnect, connectionOptions);

      if (process.env.PAYLOAD_DROP_DATABASE === 'true') {
        logger.info('---- DROPPING DATABASE ----');
        await mongoose.connection.dropDatabase();
        logger.info('---- DROPPED DATABASE ----');
      }
      logger.info(successfulConnectionMessage);
    } catch (err) {
      logger.error(
        `Error: cannot connect to MongoDB. Details: ${err.message}`,
        err,
      );
      process.exit(1);
    }
  }
  return mongoMemoryServer;
};
export default connectMongoose;
