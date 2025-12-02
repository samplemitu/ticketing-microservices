import express from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@samplemitu-common/common';

const router = express.Router();

router.post('/api/tickets/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError(); 
  }

  res.send(ticket);
});

export { router as showTicketRouter };
