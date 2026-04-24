import { Gender } from "../models/index.js";

class GenderController {
    getAll = async (req, res) => {
        try {
            const genders = await Gender.findAll();

            if (genders.length === 0) {
                return res.status(404).json({ message: "Aucun genre trouvée" });
            }

            res.json(genders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    create = async (req, res) => {
        try {
            const { name } = req.body;

            const existingGender = await Gender.findOne({ where: { name } });

            if (existingGender) {
                return res.status(400).json({ message: "Le genre existe deja" });
            }

            const gender = await Gender.create(req.body);

            res.json(gender);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const gender = await Gender.findByPk(id);

            if (!gender) {
                return res.status(404).json({ message: "Le genre n'existe pas" });
            }

            await gender.update(req.body);

            res.json(gender);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params;

            const gender = await Gender.findByPk(id);

            if (!gender) {
                return res.status(404).json({ message: "Le genre n'existe pas" });
            }

            await gender.destroy();

            res.json(true);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Une erreur s'est produite" });
        }
    }
}

export default new GenderController;