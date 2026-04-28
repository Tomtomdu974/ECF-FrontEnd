import { body, param } from 'express-validator';
import { returnErrors } from './index.js';
import { Category, Game, Gender } from '../models/index.js';

const validateGame = [
    body('title')
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Le titre doit avoir au moins 2 caractères'),
    body('release_year')
        .trim()
        .notEmpty()
        .isInt({ min: 1960, max: new Date().getFullYear() })
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
    body('image')
        .trim()
        .notEmpty()
        .withMessage('L\'image est obligatoire'),
    body('categoryId')
        .trim()
        .notEmpty()
        .withMessage('La catégorie est obligatoire')
        .custom(async (CategoryId) => {
            const category = await Category.findByPk(CategoryId);
            if (!category) {
                throw new Error('La catégorie n\'existe pas');
            }
        }),
    body('genderId')
        .trim()
        .notEmpty()
        .withMessage('Le genre est obligatoire')
        .custom(async (GenderId) => {
            const gender = await Gender.findByPk(GenderId);
            if (!gender) {
                throw new Error('Le genre n\'existe pas');
            }
        }),
]

const validateGameId = [
    param('id')
        .trim()
        .notEmpty()
        .isInt()
        .custom(async (id) => {
            const game = await Game.findByPk(id);
            if (!game) {
                throw new Error('Le jeu est introuvable');
            }
        }),
]

export { validateGame, validateGameId }