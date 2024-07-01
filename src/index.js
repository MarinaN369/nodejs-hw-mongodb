import { initMongoConnection } from './db/initMongoConnection.js';
import {setupServer} from './server.js';

const bootstrap = async() => {
    await initMongoConnection();
    setupServer();

}
bootstrap();

export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc',
  };

  export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

