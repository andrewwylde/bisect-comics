import { Pool, Client, ClientConfig, QueryResult } from 'pg';
var config: ClientConfig = {
  database: 'webcomics',
  host: 'localhost',
  port: 5432
};

const pool = new Pool( config );

function errorHandler( error: NodeJS.ErrnoException ) {
  console.error('err', error);
}

pool.on( 'error', errorHandler );

export const query = async function (text: string, values: string[] ) {
  return await pool.query( text, values );
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
export const connect = async function () {
  return await pool.connect();
};
