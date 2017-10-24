import * as express from 'express';
import routes from './routes';

const app = express();

routes( app );

const db = require('../db');

export default app;