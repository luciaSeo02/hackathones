import deleteAttachmentService from '../../services/admin/deleteAttachmentService.js';

const deleteAttachmentController = async (req, res, next) => {
    try {
        const {id, fileId} = req.params;

        await deleteAttachmentService(id, fileId);

        res.send({
            status: 'ok',
            message: 'El archivo se ha eliminado correctamente'
        });
        
    } catch (error) {
        next(error);
    }
}

export default deleteAttachmentController;