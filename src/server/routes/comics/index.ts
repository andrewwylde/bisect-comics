import { Router, Request, Response } from 'express';
import { QueryResult } from 'pg';
import { query } from '../../../db';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const queryStr = `SELECT * from comics`;
  query(queryStr, [], (err:Error, result: QueryResult) => {
    return res.json(result.rows)
  });
});

const index = router;

export default index;