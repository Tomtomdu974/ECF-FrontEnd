import express from 'express';
import GenderController from '../controllers/gender.controller.js';

const router = express.Router();

router.get('/', GenderController.getAll);
router.post('/', GenderController.create);
router.put('/:id', GenderController.update);
router.delete('/:id', GenderController.delete);

export default router;