import selectUserByIdService from '../../services/users/selectUserByIdService.js';
import { HOST, PORT } from '../../../env.js';

const infoUserController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const user = await selectUserByIdService(id);

        const avatarUrl = user.avatar
            ? `${HOST}:${PORT}/uploads/avatar/${user.avatar}`
            : null;

        res.send({
            status: 'ok',
            data: {
                ...user,
                avatar: avatarUrl,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default infoUserController;
