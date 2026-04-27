import { User, Game, Manga, Anime } from "../models/index.js";
import bcrypt from 'bcrypt';

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

            res.json(userWithoutPassword);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params;

            // On extrait le password du body pour ne pas le passer en clair
            const { password, ...bodyWithoutPassword } = req.body;

            // On hashe le password seulement s'il est fourni
            let hashedPassword;
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            // On met à jour avec le body sans password + le password hashé si présent
            const userUpdate = await user.update({ ...bodyWithoutPassword, ...(hashedPassword && { password: hashedPassword }) });

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