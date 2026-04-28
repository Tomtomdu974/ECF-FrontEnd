import express from 'express';
import AnimeController from '../controllers/anime.controller.js';
import { validateAnime, validateAnimeId } from '../validators/anime.validator.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.get('/', AnimeController.getAll);
router.get('/:id', validateAnimeId, AnimeController.getById);
router.post('/', upload.single('image'), validateAnime, AnimeController.create);
router.put('/:id', upload.single('image'), validateAnimeId, AnimeController.update);
router.delete('/:id', validateAnimeId, AnimeController.delete);

export default router;