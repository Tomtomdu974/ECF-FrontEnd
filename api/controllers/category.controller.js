import { Category } from "../models/index.js";

class CategoryController {
    getAll = async (req, res) => {
        try {
            const categories = await Category.findAll();

            res.json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    create = async (req, res) => {
        try {
            const { name } = req.body;

            const existingCategory = await Category.findOne({ where: { name } });

            if (existingCategory) {
                return res.status(400).json({ message: "La categorie existe deja" });
            }

            const category = await Category.create(req.body);

            res.json(category);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: "La categorie n'existe pas" });
            }

            await category.update(req.body);

            res.json(category);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params;

            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: "La categorie n'existe pas" });
            }

            await category.destroy();

            res.json(true);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }
}

export default new CategoryController;