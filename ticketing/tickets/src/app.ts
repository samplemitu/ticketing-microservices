import express from 'express';
import cookieSession from 'cookie-session';
import { indexTicketRouter } from './routes/index';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { updateTicketRouter } from './routes/update';
import { currentUser } from '@samplemitu-common/common';
import { NotFoundError } from '@samplemitu-common/common';
import { errorHandler } from '@samplemitu-common/common';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUser); 

app.use(indexTicketRouter);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError(); 
});

app.use(errorHandler); 

export { app };
