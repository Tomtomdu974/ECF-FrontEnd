import { validationResult } from 'express-validator';

const returnErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        const newErrors = {};
        errors.array().forEach((single) => {
            newErrors[single.path] = single.msg;
        })

        // Retourner les erreurs si elles existent
        return res.status(400).json({ errors: newErrors });
    }
    next(); // Passer au middleware ou routeur suivant si tout est valide
};

export {
    returnErrors
}