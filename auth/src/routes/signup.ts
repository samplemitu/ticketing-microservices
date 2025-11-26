import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/api/user/signup',
  [
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 6 })
      .withMessage('Password should be at least 8 chars'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      throw new Error('something went wrong');
    }

    res.status(200).send({ email });
  }
);

export { router as signupRouter };
