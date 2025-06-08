import selectUserByIdService from '../../services/users/selectUserByIdService.js';
import { savePhotoUtils, deletePhotoUtils } from '../../utils/photoUtils.js';
import updateUserAvatarService from '../../services/users/updateUserAvatarService.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';

const editAvatarController = async (req, res, next) => {
    try {
        const { avatar } = req.files;

        if (Array.isArray(avatar)) {
            if (avatar.length > 1) {
                throw generateErrorUtils('Solo se permite un avatar', 400);
            }
        }

        const avatarFile = Array.isArray(avatar) ? avatar[0] : avatar;

        const user = await selectUserByIdService(req.user.id);

        if (user.avatar) await deletePhotoUtils(user.avatar);

        const avatarName = await savePhotoUtils(avatarFile, 100);

        await updateUserAvatarService(avatarName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Avatar actualizado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editAvatarController;
