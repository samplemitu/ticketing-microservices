import express from 'express';
import cookieSession from 'cookie-session';
import { indexTicketRouter } from './routes/index';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { updateTicketRouter } from './routes/update';
import { currentUser } from '../../auth/src/middlewares/current-user';
import { NotFoundError } from '../../auth/src/errors/not-found-error';
import { errorHandler } from '../../auth/src/middlewares/error-handlers';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUser); // For the time being (will make independent middleware)

app.use(indexTicketRouter);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError(); // For the time being (depending on auth middleware)
});

app.use(errorHandler); // Same goes with this too

export { app };
