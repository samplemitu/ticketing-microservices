import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../../auth/src/middlewares/validate-result';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '../../../auth/src/errors/not-found-error';
import { NotAuthorizedError } from '@rallycoding/common';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('price must be provided and must be greater than  0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError(); // Need to make custom error
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });

    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
