import jwt from 'jsonwebtoken';
import generateErrorUtils from '../utils/generateErrorUtils.js';

const authMiddleware = (req, res, next) => {

    try {
        
        const { authorization } = req.headers;

        if (!authorization) {

            throw generateErrorUtils(
                'No se ha proporcionado un token de autorización',
                401
            );
        }

        const token = authorization.startsWith('Bearer ')
            ? authorization.slice(7)
            : authorization;

        let info;

        try {

            info = jwt.verify(token, process.env.SECRET);

        } catch (error) {

            throw generateErrorUtils(
                'El token de autorización no es válido',
                401,
                error
            );
        }

        req.user = info;
        next();
        
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;
