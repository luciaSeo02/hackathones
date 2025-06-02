import deleteHackhatonService from '../../services/hackathons/deleteHackathonService.js';

const deleteHackathonController = async (req, res, next) => {
    try {
        
        const { id } = req.params;

        await deleteHackhatonService(id);

        res.status(200).send({

            status: 'ok',
            message: 'Hackathon eliminado correctamente',

        });

    } catch (error) {
        next(error);

    }

};

export default deleteHackathonController;
