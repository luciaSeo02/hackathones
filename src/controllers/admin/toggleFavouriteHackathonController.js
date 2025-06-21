import getPool from '../../database/getPool.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';

const toggleFavouriteHackathonController = async (req, res, next) => {
    try {
        const pool = await getPool();
        const { id } = req.params;

        const [rows] = await pool.query(
            `SELECT isFavourite FROM hackathons WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) {
            throw generateErrorUtils('Hackathon no encontrado', 404);
        }

        const currentStatus = rows[0].isFavourite;
        const newStatus = !currentStatus;

        await pool.query(`UPDATE hackathons SET isFavourite = ? WHERE id = ?`, [
            newStatus,
            id,
        ]);

        res.status(200).send({
            status: 'ok',
            isFavourite: newStatus,
        });
    } catch (error) {
        next(error);
    }
};

export default toggleFavouriteHackathonController;
