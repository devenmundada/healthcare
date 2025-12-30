import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

// Signup route
router.post(
  '/signup',
  [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address')
      .normalizeEmail(),
    
    body('phone')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .matches(/^[\+]?[1-9][\d]{0,15}$/).withMessage('Please enter a valid phone number'),
    
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
  ],
  AuthController.signup
);

// Login route
router.post(
  '/login',
  [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address')
      .normalizeEmail(),
    
    body('password')
      .notEmpty().withMessage('Password is required')
  ],
  AuthController.login
);

// Get current user route
router.get('/me', AuthController.getCurrentUser);

export const authRoutes = router;