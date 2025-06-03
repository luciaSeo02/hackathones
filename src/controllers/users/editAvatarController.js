import selectUserByIdService from "../../services/users/selectUserByIdService.js";
import { savePhotoUtils, deletePhotoUtils } from "../../utils/photoUtils.js";
import updateUserAvatarService from "../../services/users/updateUserAvatarService.js";


const editAvatarController = async (req, res, next) => {
    try {

        const { avatar } = req.files;

        const user = await selectUserByIdService(req.user.id);

        if(user.avatar) await deletePhotoUtils(user.avatar);

        const avatarName = await savePhotoUtils(avatar, 100);

        await updateUserAvatarService(avatarName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Avatar actualizado correctamente'
        });

    } catch (error) {
        next(error);
    }

}

export default editAvatarController;
