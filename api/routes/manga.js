import express from 'express';
import MangaController from '../controllers/manga.controller.js';
import { validateManga, validateMangaId } from '../validators/manga.validator.js';
import { returnErrors } from '../validators/index.js';
import upload from '../middlewares/multer.js';
import { verifyToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', MangaController.getAll);
router.get('/:id', validateMangaId, returnErrors, MangaController.getById);
router.post('/', verifyToken, isAdmin, upload.single('image'), validateManga, returnErrors, MangaController.create);
router.put('/:id', verifyToken, isAdmin, upload.single('image'), validateMangaId, returnErrors, MangaController.update);
router.delete('/:id', verifyToken, isAdmin, validateMangaId, returnErrors, MangaController.delete);

export default router;