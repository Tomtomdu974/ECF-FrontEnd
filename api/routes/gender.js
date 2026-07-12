import express from 'express';
import GenderController from '../controllers/gender.controller.js';
import { verifyToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', GenderController.getAll);
router.post('/', verifyToken, isAdmin, GenderController.create);
router.put('/:id', verifyToken, isAdmin, GenderController.update);
router.delete('/:id', verifyToken, isAdmin, GenderController.delete);

export default router;