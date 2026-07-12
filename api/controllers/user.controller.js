import { User, Game, Manga, Anime } from "../models/index.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    getAll = async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: {
                    exclude: ['password']
                },
                include: [Game, Manga, Anime]
            });

            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                attributes: {
                    exclude: ['password']
                },
                include: [Game, Manga, Anime]
            });

            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    create = async (req, res) => {
        try {
            const { firstName, lastName, email, userName, password } = req.body;

            const existingUser = await User.findOne({ where: { email } });

            if (existingUser) {
                return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ ...req.body, password: hashedPassword });
            const { password: _, ...userWithoutPassword } = newUser.toJSON();

            const token = jwt.sign(
                { id: newUser.id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json(userWithoutPassword);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ message: "Email ou mot de passe incorrect" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Email ou mot de passe incorrect" });
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: false, // à mettre à true en production (HTTPS)
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            const { password: _, ...userWithoutPassword } = user.toJSON();
            res.json(userWithoutPassword);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    me = async (req, res) => {
        res.json(req.user);
    }

    logout = async (req, res) => {
        res.clearCookie('token');
        res.json({ message: "Déconnecté" });
    }

    update = async (req, res) => {
        try {
            const { id } = req.params;

            // On extrait password et role du body pour les traiter à part
            const { password, role, ...bodyWithoutSensitiveFields } = req.body;

            // On hashe le password seulement s'il est fourni
            let hashedPassword;
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            // Seul un admin peut modifier le role
            const roleUpdate = req.user.role === 'admin' && role ? { role } : {};

            const userUpdate = await user.update({
                ...bodyWithoutSensitiveFields,
                ...(hashedPassword && { password: hashedPassword }),
                ...roleUpdate
            });

            // On exclut le password de la réponse
            const { password: _, ...userWithoutPassword } = userUpdate.toJSON();

            res.json(userWithoutPassword);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            await user.destroy();
            res.json(true);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }
}

export default new UserController;