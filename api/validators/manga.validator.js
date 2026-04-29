import { body, param } from 'express-validator';
import { returnErrors } from './index.js';
import { Category, Manga, Gender } from '../models/index.js';

const validateManga = [
    body('title')
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Le titre doit avoir au moins 2 caractères'),
    body('release_year')
        .trim()
        .notEmpty()
        .isDate()
        .withMessage('La date de sortie est obligatoire'),
    body('author')
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('L\'auteur est obligatoire et doit avoir au moins 2 caractères'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('La description est obligatoire'),
    body('nbVolumes')
        .trim()
        .notEmpty()
        .isInt({ min: 1 })
        .withMessage('Le nombre de volumes est obligatoire'),
    body('CategoryId')
        .trim()
        .notEmpty()
        .withMessage('La catégorie est obligatoire')
        .custom(async (CategoryId) => {
            const category = await Category.findByPk(CategoryId);
            if (!category) {
                throw new Error('La catégorie n\'existe pas');
            }
        }),
    body('GenderId')
        .trim()
        .notEmpty()
        .withMessage('Le genre est obligatoire')
        .custom(async (GenderId) => {
            const genre = await Gender.findByPk(GenderId);
            if (!genre) {
                throw new Error('Le genre n\'existe pas');
            }
        })
]

const validateMangaId = [
    param('id')
        .trim()
        .notEmpty()
        .isInt()
        .custom(async (id) => {
            const manga = await Manga.findByPk(id);
            if (!manga) {
                throw new Error('Le manga est introuvable');
            }
        }),
]

export { validateManga, validateMangaId }