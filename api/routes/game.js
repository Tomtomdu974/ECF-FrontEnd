import express from 'express';
import GameController from '../controllers/game.controller.js';
import { validateGame, validateGameId } from '../validators/game.validator.js';
import { returnErrors } from '../validators/index.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.get('/', GameController.getAll);
router.get('/:id',validateGameId, returnErrors, GameController.getById);
router.post('/', upload.single('image'), validateGame, returnErrors, GameController.create);
router.put('/:id', upload.single('image'), validateGameId, returnErrors, GameController.update);
router.delete('/:id', validateGameId, returnErrors, GameController.delete);

export default router;