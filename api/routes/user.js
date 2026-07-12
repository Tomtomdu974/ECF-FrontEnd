import express from 'express';
import UserController from '../controllers/user.controller.js';
import { verifyToken, isAdmin, isSelfOrAdmin } from '../middlewares/auth.js';
import { validateUserCreate, validateUserUpdate, validateUserId } from '../validators/user.validator.js';
import { returnErrors } from '../validators/index.js';

const router = express.Router();

router.get('/me', verifyToken, UserController.me);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/', validateUserCreate, returnErrors, UserController.create);

router.get('/', verifyToken, isAdmin, UserController.getAll);
router.get('/:id', verifyToken, isAdmin, validateUserId, returnErrors, UserController.getById);
router.put('/:id', verifyToken, isSelfOrAdmin, validateUserId, validateUserUpdate, returnErrors, UserController.update);
router.delete('/:id', verifyToken, isAdmin, validateUserId, returnErrors, UserController.delete);

export default router;