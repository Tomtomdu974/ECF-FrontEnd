import { Manga, Category, Gender } from "../models/index.js";
import { Op } from 'sequelize';

class MangaController {
    getAll = async (req, res) => {
        try {
            const { category, search, selectedGenre } = req.query;
            let where = {};

            if (category) {
                where.CategoryId = category
            }

            if (search) {
                where.title = { [Op.like]: `%${search}%` }
            }

            if (selectedGenre) {
                where.GenderId = selectedGenre
            }

            const mangas = await Manga.findAll({
                where,
                include: [Category, Gender]
            });

            res.json(mangas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const manga = await Manga.findByPk(id, {
                include: Category
            })

            if (!manga) {
                return res.status(404).json({ message: "Manga non trouvé" });
            }

            res.json(manga);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    create = async (req, res) => {
        try {
            const { title, release_year, author, description, nbVolumes, CategoryId } = req.body;

            const existingManga = await Manga.findOne({ where: { title } });

            if (existingManga) {
                return res.status(400).json({ message: "Le manga existe deja" });
            }

            if (!req.file) {
                return res.status(400).json({ message: "Une image est obligatoire" });
            }

            const manga = await Manga.create({ ...req.body, image: req.file.path });

            res.json(manga);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params;

            const manga = await Manga.findByPk(id);

            if (!manga) {
                return res.status(404).json({ message: "Manga non trouvé" });
            }

            await manga.update({ ...req.body, ...(req.file && { image: req.file.path }) });

            res.json(manga);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params;

            const manga = await Manga.findByPk(id);

            if (!manga) {
                return res.status(404).json({ message: "Manga non trouvé" });
            }

            await manga.destroy();

            res.json(true);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }
}

export default new MangaController