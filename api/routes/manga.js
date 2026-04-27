import express from 'express';
import MangaController from '../controllers/manga.controller.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.get('/', MangaController.getAll);
router.get('/:id', MangaController.getById);
router.post('/', upload.single('image'), MangaController.create);
router.put('/:id', MangaController.update);
router.delete('/:id', MangaController.delete);

export default router;