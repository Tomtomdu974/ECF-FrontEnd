import { Anime, Category } from "../models/index.js";
import { Op } from 'sequelize';

class AnimeController {
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

            const animes = await Anime.findAll({
                where,
                include: Category
            });

            if (animes.length === 0) {
                return res.status(404).json({ message: "Aucun anime trouvé" });
            }

            res.json(animes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const anime = await Anime.findByPk(id, {
                include: Category
            })

            if (!anime) {
                return res.status(404).json({ message: "Anime non trouvé" });
            }

            res.json(anime);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    create = async (req, res) => {
        try {
            const { title, release_year, author, description, nbEpisodes, CategoryId } = req.body;

            const existingAnime = await Anime.findOne({ where: { title } });

            if (existingAnime) {
                return res.status(400).json({ message: "Anime déjà existant" });
            }

            const anime = await Anime.create(req.body);

            res.json(anime);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const anime = await Anime.findByPk(id);

            if (!anime) {
                return res.status(404).json({ message: "Anime non trouvé" });
            }

            await anime.update(req.body);

            res.json(anime);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const anime = await Anime.findByPk(id);

            if (!anime) {
                return res.status(404).json({ message: "Anime non trouvé" });
            }

            await anime.destroy();

            res.json(true);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }
}

export default new AnimeController;