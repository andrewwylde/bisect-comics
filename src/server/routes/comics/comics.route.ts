import { Router, Request, Response, Application } from 'express';
import { QueryResult } from 'pg';
import { query } from '../../../db';

const router = Router();

router.get('/comics', (req: Request, res: Response) => {
  const limit = req.query.limit || 10;
  const queryStr = `SELECT * from comics LIMIT ${limit}`;
  query(queryStr, [], (err:Error, result: QueryResult) => {
    return res.json(result.rows)
  });
});

router.get('/comics/:id', (req: Request, res: Response): void => {
  const _id = req.params.id;
  const queryStr = `SELECT * from comics WHERE _id = ${_id}`;

  query(queryStr, [], (err:Error, result: QueryResult) => {
    return res.json(result.rows)
  });
});

const index = router;

export default function( app:Application ) {
  app.use('/', router );
}