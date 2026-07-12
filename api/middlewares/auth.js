import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(403).json({ message: 'Aucun token trouvé' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Token invalide ou expiré' })
    }

}

const isAdmin = async (req, res, next) => {
    const { user } = req;

    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Vous n\'avez pas la permission d\'accéder à ce contenu' });
    }
    next();
}

const isSelfOrAdmin = (req, res, next) => {
    const { user } = req;
    const targetId = Number(req.params.id);

    if (user.id !== targetId && user.role !== 'admin') {
        return res.status(403).json({ message: 'Vous n\'avez pas la permission de modifier ce compte' });
    }
    next();
};

export { verifyToken, isAdmin, isSelfOrAdmin };