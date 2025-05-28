// este bloque de código es provisional a la espera de la BBDD

import selectHackathonByIdService from '../../services/hackathons/selectHackathonByIdService.js';

const getHackathonByIdController = async (req, res, next) => {
    
    try {
        
        const hackathon = await selectHackathonByIdService(req.params.id);

        if(!hackathon) {
            return res.status(404).send({ error: 'Ups! No hemos encontrado ningún Hackathon!' });
        }

        res.send({
            status: 'ok',
            data: hackathon
        })

    } catch (error) {
        next(error);
    }

};

export default getHackathonByIdController;