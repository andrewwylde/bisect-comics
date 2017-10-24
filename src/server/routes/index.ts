import index from './base';
import comics from './comics';
import { IRoute, Router, Application } from 'express';

const router = Router();

export default function( app: Application ) {
  app.use( '/', index );
  app.use( '/comics', comics );
}
