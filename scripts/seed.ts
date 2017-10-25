import * as http from 'https';
import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { QueryResult } from 'pg';
import { query, connect } from './db';

const comicReg = /comic\/(.*)/;

interface urlObj {
  url: string;
  id: string | null;
}

function buildRequest( str_id: string ) {
  return {
    host: `smbc-comics.com`,
    path: `/comic/${str_id}`,
    method: 'GET'
  };
}

function getURLObject( $: CheerioStatic ): urlObj {
  const url = $( '.next' ).first().attr( 'href' ) || '';
  const match = url.match( comicReg );

  return {
    url,
    id: match ? match[ 1 ] : null
  };
}

function handleEnd( html: string ) {
  let $ = cheerio.load( html );
  return getURLObject( $ );
}

function getId( id: string ): Promise < urlObj > {
  return new Promise( ( resolve, reject ) => {
    let opts = buildRequest( id );
    let req = http.get( opts, ( res ) => {
      let html = '';
      res.on( 'data', ch => ( html += ch.toString() ) );
      res.on( 'end', () => ( resolve( handleEnd( html ) ) ) );
    } );
    req.on( 'error', err => ( console.log( err ) ) )
    req.end();
  } )
}

function add( id: string, url: string ) {
  let text = 'INSERT INTO comics(comic_title,url) VALUES($1, $2)';
  let values = [ 'smbc-comics', url ];

  return query( text, values, ( err: Error, result: QueryResult ) => {
    return void 0;
  } );
}

async function getIds( id: string = `2009-04-20` ) {
  let linkObj: urlObj;

  while ( id.length !== 0 ) {
    try {
      linkObj = await getId( id );
    } catch ( e ) {
      console.error( e );
      id = '';
      break;
    }

    id = linkObj.id || '';
    let result = await add( id, linkObj.url );
  }

  query( 'SELECT * from comics', [], ( err, res ) => {
    console.log( res.rows.slice( 0, 9 ) );
  } );
}

getIds();
