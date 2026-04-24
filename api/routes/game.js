import express from 'express';
import GameController from '../controllers/game.controller.js';

const router = express.Router();

router.get('/', GameController.getAll);
router.get('/:id', GameController.getById);
router.post('/', GameController.create);
router.put('/:id', GameController.update);
router.delete('/:id', GameController.delete);

export default router;