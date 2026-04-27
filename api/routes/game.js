import express from 'express';
import GameController from '../controllers/game.controller.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.get('/', GameController.getAll);
router.get('/:id', GameController.getById);
router.post('/', upload.single('image'), GameController.create);
router.put('/:id', upload.single('image'), GameController.update);
router.delete('/:id', GameController.delete);

export default router;