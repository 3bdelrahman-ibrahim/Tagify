import express from 'express';
import { validateUser } from '../middleware/validation.middleware.js';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

// CRUD Routes
router.post('/', validateUser, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

// HTML view route (separate from API routes)
router.get('/:id/view', userController.renderUserView);

export default router;