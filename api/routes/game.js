import express from 'express';
import GameController from '../controllers/game.controller.js';
import { validateGame, validateGameId } from '../validators/game.validator.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.get('/', GameController.getAll);
router.get('/:id',validateGameId, GameController.getById);
router.post('/', upload.single('image'), validateGame, GameController.create);
router.put('/:id', upload.single('image'), validateGameId, GameController.update);
router.delete('/:id', validateGameId, GameController.delete);

export default router;