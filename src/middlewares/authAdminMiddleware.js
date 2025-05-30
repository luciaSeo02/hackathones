import generateErrorUtils from '../utils/generateErrorUtils.js'

const isAdminMiddleware = (req, res, next) => {

    if (!req.user || req.user.role !== 'admin') {
        return next(generateErrorUtils('No tienes permisos para realizar esta acción', 403));
    }
    next();
};


export default isAdminMiddleware;