import { Router, Request, Response, Application } from 'express';
const router = Router();

router.get( '/', ( req: Request, res: Response ) => {
  res.render( 'index', { title: 'ComicDB' } );
} );

export default function ( app: Application ) {
  app.use( '/', router );
}
