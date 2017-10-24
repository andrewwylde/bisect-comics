import { Pool, Client, QueryResult } from 'pg';
var config = {
  database: 'webcomics',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

const pool = new Pool(config);


pool.on('error', (err:NodeJS.ErrnoException, client:Client) => {
  console.error('err',err);
});

export const query = async function (text: string, values: string[], callback: (err: Error, result: QueryResult ) => void) {
  // console.log('query:', text, values);
  return await pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
export const connect = async function (callback: (err: Error, client: Client) => void) {
  return  await pool.connect(callback);
};