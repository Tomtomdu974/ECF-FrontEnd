import { Game, Category } from "../models/index.js";
import { Op } from 'sequelize';

class GameController {
    getAll = async (req, res) => {
        try {
            const { category, search } = req.query;
            let where = {};
            if (category) {
                where.CategoryId = category
            }

            if (search) {
                where.title = { [Op.like]: `%${search}%` }
            }

            const games = await Game.findAll({
                where,
                include: Category
            });

            if (games.length === 0) {
                return res.status(404).json({ message: "Aucun jeu trouvé" });
            }

            res.json(games);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const game = await Game.findByPk(id, {
                include: Category
            });

            if (!game) {
                return res.status(404).json({ message: "Jeu non trouvé" });
            }

            res.json(game);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }

    }

    create = async (req, res) => {
        try {
            const { title, release_year, author, description, CategoryId } = req.body;

            const existingGame = await Game.findOne({ where: { title } });

            if (existingGame) {
                return res.status(400).json({ message: "Le jeu existe deja" });
            }

            const game = await Game.create(req.body);

            res.json(game);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    update = async (req, res) => {
        try {
            const game = await Game.findByPk(req.params.id);

            if (!game) {
                return res.status(404).json({ message: "Jeu non trouvé" });
            }

            await game.update(req.body);

            res.json(game);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const game = await Game.findByPk(id);

            if (!game) {
                return res.status(404).json({ message: "Jeu non trouvé" });
            }

            await game.destroy();

            res.json(true)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }
}

export default new GameController;