import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';
import { signupRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(signupRouter);

app.use('*', async (req: Request, res: Response) => {
  throw new Error('404 Page not found');
});

app.listen(8000, () => {
  console.log('app listining on port 8000');
});
