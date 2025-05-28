// este bloque de código es provisional a la espera de la BBDD

import insertHackathonService from '../../services/hackathons/insertHackathonService.js'

const createHackathonController = async (req, res, next) => {
    
    try {
        
        if(req.headers['rol?'] !== 'admin'){
            return res.status(403).json({ error: 'Necesitas permisos de administrador para crear un hackathon'});
        }

        const id = await insertHackathonService(req.body);

        res.status(200).send({
            status: 'ok',
            message: 'Hackathon creado correctamente',
            data: {}
        })

    } catch (error) {
        next(error);
    }
    
}


export default createHackathonController;