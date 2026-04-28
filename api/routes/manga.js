import express from 'express';
import MangaController from '../controllers/manga.controller.js';
import { validateManga, validateMangaId } from '../validators/manga.validator.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.get('/', MangaController.getAll);
router.get('/:id', validateMangaId, MangaController.getById);
router.post('/', upload.single('image'), validateManga, MangaController.create);
router.put('/:id', upload.single('image'), validateMangaId, MangaController.update);
router.delete('/:id', validateMangaId, MangaController.delete);

export default router;