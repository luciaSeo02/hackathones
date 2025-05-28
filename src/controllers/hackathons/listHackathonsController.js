// este bloque de código es provisional a la espera de la BBDD

import selectHackathonsService from '../../services/hackathons/selectHackathonsService.js';

const listHackathonsController = async (req, res, next) => {

    try {

        const hackathons = await selectHackathonsService();

        res.send({
            status: 'ok',
            data: hackathons
        })

    } catch (error) {
        next(error);
    }

};


export default listHackathonsController;
