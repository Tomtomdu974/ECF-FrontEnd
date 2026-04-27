import express from 'express';
import AnimeController from '../controllers/anime.controller.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.get('/', AnimeController.getAll);
router.get('/:id', AnimeController.getById);
router.post('/', upload.single('image'), AnimeController.create);
router.put('/:id', upload.single('image'), AnimeController.update);
router.delete('/:id', AnimeController.delete);

export default router;