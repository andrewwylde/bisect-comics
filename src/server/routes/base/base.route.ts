import { Router, Request, Response, Application } from 'express';
const router = Router();

router.get('/', ( req: Request, res: Response ) => {
  res.render('index');
});

export default function (app: Application) {
  app.use('/', router);
}