import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest } from '@samplemitu-common/common';
import { BadRequestError } from '@samplemitu-common/common';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 8 and 20 characters')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/[0-9]/)
      .withMessage('Password must contain at least one digit')
      .matches(/[^A-Za-z0-9]/)
      .withMessage('Password must contain at least one special character'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // checking if user exist in our mongoose

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    // if there is not user we create a new

    const user = User.build({ email, password });
    await user.save();

    // issuing a new JWT token and will store in session time of login/signup

    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // we storing the jwt into session

    req.session = {
      jwt: userJWT,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
