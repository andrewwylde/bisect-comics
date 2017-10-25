import * as express from 'express';
import * as helmet from 'helmet';
import routes from './routes';

const app = express();

//tsign
app.use([express.json(),helmet()])

app.set('view engine', 'hbs');
app.set('views', './src/server/views');

routes( app );

const db = require('../db');

export default app;