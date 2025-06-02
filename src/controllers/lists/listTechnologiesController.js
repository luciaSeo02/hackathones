import selectTechnologiesService from '../../services/lists/selectTechnologiesService.js';

const listTechnologiesController = async (req, res, next) => {
    try {
        const technologies = await selectTechnologiesService();

        res.send({
            status: 'ok',
            data: technologies
        });
        
    } catch (error) {
        next(error);
    }
}

export default listTechnologiesController;