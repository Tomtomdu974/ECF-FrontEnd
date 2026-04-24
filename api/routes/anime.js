import express from 'express';
import AnimeController from '../controllers/anime.controller.js';

const router = express.Router();

router.get('/', AnimeController.getAll);
router.get('/:id', AnimeController.getById);
router.post('/', AnimeController.create);
router.put('/:id', AnimeController.update);
router.delete('/:id', AnimeController.delete);

export default router;