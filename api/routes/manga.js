import express from 'express';
import MangaController from '../controllers/manga.controller.js';
import { validateManga, validateMangaId } from '../validators/manga.validator.js';
import { returnErrors } from '../validators/index.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.get('/', MangaController.getAll);
router.get('/:id', validateMangaId, returnErrors, MangaController.getById);
router.post('/', upload.single('image'), validateManga, returnErrors, MangaController.create);
router.put('/:id', upload.single('image'), validateMangaId, returnErrors, MangaController.update);
router.delete('/:id', validateMangaId, returnErrors, MangaController.delete);

export default router;