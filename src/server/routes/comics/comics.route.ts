import { Router, Request, Response, Application } from 'express';
import { QueryResult } from 'pg';
import * as url from 'url';
import { query } from '../../../db';

url.resolve

const router = Router();

function getMany( limit ? : number ):Promise<QueryResult> {
  const queryStr = `SELECT * from comics LIMIT ${limit || 10}`;
  return query(queryStr, []);
}

router.get( ['/comics', '/comics/head'], async ( req: Request, res: Response ) => {
  const limit = req.query.limit;
  const { rows } = await getMany( limit );
  res.json( rows );

} );

router.get( '/comics/tail', async ( req: Request, res: Response ) => {
  const queryStr = `SELECT * from comics ORDER BY _id DESC LIMIT 10`;
  const { rows } = await query(queryStr, []);
  res.json(rows);
} );

router.get( '/comics/:id', async ( req: Request, res: Response ) => {
  const _id = req.params.id;
  const queryStr = `SELECT * from comics WHERE _id = ${_id}`;
  const { rows } = await query( queryStr, [] );
} );

function urlvalidator( urlStr: string ) {
  const URL = url.parse( urlStr );
  return URL.host !== null && URL.slashes === true;
}

router.post( '/comics', async ( req: Request, res: Response ) => {
  const { comic_title, url } = req.body;

  if ( !url || !urlvalidator( url ) ) {
    res.status( 422 );
    res.send( { error: `url must be valid: ${url}` } );
  }

  if ( !comic_title || typeof comic_title !== 'string' ) {
    res.status( 422 );
    res.send( { error: `comic_title must be a string: ${comic_title}` } );
  }

  const queryStr = `INSERT INTO comics(comic_title,url) VALUES ($1, $2)`;
  const values = [ comic_title, url ];

  try {
    const result = await( query( queryStr, values ) );

    res.status(201);
    res.json(result.rows);
  } catch( e ) {
    res.status(400);
    res.send(e.detail);
    console.error( e );
  }

} );

router.delete( '/comics/:id', async ( req: Request, res: Response ) => {
  const id = req.params.id;

  const queryStr = `DELETE FROM comics WHERE _id = ${id}`;

  try {
    const result = await query( queryStr, [] );
    res.sendStatus(204);
  } catch( e ) {
    res.sendStatus(404);
    console.error( e );
  }

} );

const index = router;

export default function ( app: Application ) {
  app.use( '/', router );
}
