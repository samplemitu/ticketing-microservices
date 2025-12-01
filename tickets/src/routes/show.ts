import express from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '../../../auth/src/errors/not-found-error';

const router = express.Router();

router.post('/api/tickets/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError(); // need to make independed
  }

  res.send(ticket);
});

export { router as showTicketRouter };
