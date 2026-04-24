import express from 'express';
import MangaController from '../controllers/manga.controller.js';

const router = express.Router();

router.get('/', MangaController.getAll);
router.get('/:id', MangaController.getById);
router.post('/', MangaController.create);
router.put('/:id', MangaController.update);
router.delete('/:id', MangaController.delete);

export default router;