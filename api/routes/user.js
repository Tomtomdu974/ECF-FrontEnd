import express from 'express';
import UserController from '../controllers/user.controller.js';
import { verifyToken, isAdmin, isSelfOrAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/me', verifyToken, UserController.me);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/', UserController.create);

router.get('/', verifyToken, isAdmin, UserController.getAll);
router.get('/:id', verifyToken, isAdmin, UserController.getById);
router.put('/:id', verifyToken, isSelfOrAdmin, UserController.update);
router.delete('/:id', verifyToken, isAdmin, UserController.delete);

export default router;