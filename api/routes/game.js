import express from 'express';
import GameController from '../controllers/game.controller.js';
import { validateGame, validateGameId } from '../validators/game.validator.js';
import { returnErrors } from '../validators/index.js';
import upload from '../middlewares/multer.js';
import { verifyToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', GameController.getAll);
router.get('/:id',validateGameId, returnErrors, GameController.getById);
router.post('/',verifyToken, isAdmin,  upload.single('image'), validateGame, returnErrors, GameController.create);
router.put('/:id', verifyToken, isAdmin, upload.single('image'), validateGameId, returnErrors, GameController.update);
router.delete('/:id', verifyToken, isAdmin, validateGameId, returnErrors, GameController.delete);

export default router;