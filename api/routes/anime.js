import express from 'express';
import AnimeController from '../controllers/anime.controller.js';
import { validateAnime, validateAnimeId } from '../validators/anime.validator.js';
import { returnErrors } from '../validators/index.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.get('/', AnimeController.getAll);
router.get('/:id', validateAnimeId, returnErrors, AnimeController.getById);
router.post('/', upload.single('image'), validateAnime, returnErrors, AnimeController.create);
router.put('/:id', upload.single('image'), validateAnimeId, returnErrors, AnimeController.update);
router.delete('/:id', validateAnimeId, returnErrors, AnimeController.delete);

export default router;