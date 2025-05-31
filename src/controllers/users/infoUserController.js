import selectUserByIdService from "../../services/users/selectUserByIdService.js";

const infoUserController = async (req, res, next) => {
    try {
        const { id } = req.user;
      
        const user = await selectUserByIdService(id);

        res.send({
            status: 'ok',
            data: {
                user
            }
        });
        
    } catch (error) {
        next(error);
    }
}

export default infoUserController;
