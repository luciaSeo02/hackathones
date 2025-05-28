import insertHackathonService from '../../services/hackathons/insertHackathonService.js'

const createHackathonController = async (req, res, next) => {
    
    try {
        
        const userRole = req.headers['dev'];

        if(req.headers[userRole] !== 'admin'){
            return res.status(403).json({ error: 'Necesitas permisos de administrador para crear un hackathon'});
        }

        const id = await insertHackathonService(req.body);

        res.status(200).send({
            status: 'ok',
            message: 'Hackathon creado correctamente',
            data: { id }
        })

    } catch (error) {
        next(error);
    }
    
};


export default createHackathonController;