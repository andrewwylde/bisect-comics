import index from './base';
import comics from './comics';
import { IRoute, Router, Application } from 'express';

const router = Router();

function initialize( this:Application, fn:Function ):void {
  fn( this );
}

export default function( app: Application ) {


  [comics].map( initialize.bind( app ) )
  // app.use( '/', index );
  // app.use( '/comics', comics );
}
