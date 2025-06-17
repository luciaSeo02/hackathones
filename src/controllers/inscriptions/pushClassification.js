import addRanking from '../../services/inscriptions/addRankingHackathon.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';
import getPool from '../../database/getPool.js';

const publishRanking = async (req, res, next) => {
    try {
        const { ranking } = req.body;
        const { hackathonId } = req.params;

        if (!Array.isArray(ranking) || ranking.length === 0) {
            return next(generateErrorUtils('Debes enviar al menos un ranking', 400));
        }

        const pool = await getPool();

        for (const { userId, position } of ranking) {
        if (
            !userId ||
            !position ||
            typeof position !== 'number' ||
            position < 1
          
        
        ) {
            return next(
                generateErrorUtils(
                    'Debes indicar un usuario válido y una posición positiva',
                    400
                )
            );
        }


        const [rows] = await pool.query(
            'SELECT id FROM hackathon_user_registrations WHERE userId = ? AND hackathonId = ?',
            [userId, hackathonId]
        );
        if (rows.length === 0) {
            return next(
                generateErrorUtils(
                    'Solo los usuarios inscritos pueden ser calificados en este hackathon',
                    403
                )
            );
        }

        await addRanking({
            userId,
            hackathonId: Number(hackathonId),
            position,
        });
    }

        res.status(201).json({
            message: 'Clasificación publicada correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default publishRanking;
