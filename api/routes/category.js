import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import { verifyToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', CategoryController.getAll);
router.post('/', verifyToken, isAdmin, CategoryController.create);
router.put('/:id', verifyToken, isAdmin, CategoryController.update);
router.delete('/:id', verifyToken, isAdmin, CategoryController.delete);

export default router;
