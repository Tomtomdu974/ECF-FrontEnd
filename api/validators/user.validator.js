import { body, param } from 'express-validator';
import { User } from '../models/index.js';

const validateUserCreate = [
    body('firstName')
        .trim()
        .notEmpty().withMessage('Le prénom est obligatoire')
        .isLength({ min: 2 }).withMessage('Le prénom doit avoir au moins 2 caractères'),
    body('lastName')
        .trim()
        .notEmpty().withMessage('Le nom est obligatoire')
        .isLength({ min: 2 }).withMessage('Le nom doit avoir au moins 2 caractères'),
    body('userName')
        .trim()
        .notEmpty().withMessage('Le nom d\'utilisateur est obligatoire')
        .isLength({ min: 3 }).withMessage('Le nom d\'utilisateur doit avoir au moins 3 caractères')
        .custom(async (userName) => {
            const existing = await User.findOne({ where: { userName } });
            if (existing) {
                throw new Error('Ce nom d\'utilisateur est déjà pris');
            }
        }),
    body('email')
        .trim()
        .notEmpty().withMessage('L\'email est obligatoire')
        .isEmail().withMessage('L\'email doit être valide')
        .custom(async (email) => {
            const existing = await User.findOne({ where: { email } });
            if (existing) {
                throw new Error('Un utilisateur avec cet email existe déjà');
            }
        }),
    body('password')
        .notEmpty().withMessage('Le mot de passe est obligatoire')
        .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères'),
]

const validateUserUpdate = [
    body('firstName')
        .optional()
        .trim()
        .isLength({ min: 2 }).withMessage('Le prénom doit avoir au moins 2 caractères'),
    body('lastName')
        .optional()
        .trim()
        .isLength({ min: 2 }).withMessage('Le nom doit avoir au moins 2 caractères'),
    body('userName')
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage('Le nom d\'utilisateur doit avoir au moins 3 caractères'),
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('L\'email doit être valide'),
    body('password')
        .optional()
        .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères'),
]

const validateUserId = [
    param('id')
        .trim()
        .notEmpty()
        .isInt()
        .custom(async (id) => {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('L\'utilisateur est introuvable');
            }
        }),
]

export { validateUserCreate, validateUserUpdate, validateUserId };