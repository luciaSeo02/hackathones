import selectTopicsService from '../../services/lists/selectTopicsService.js';

const listTopicsController = async (req, res, next) => {
    try {
        const topics = await selectTopicsService();

        res.send({
            status: 'ok',
            data: topics
        });
        
    } catch (error) {
        next(error);
    }
}

export default listTopicsController;