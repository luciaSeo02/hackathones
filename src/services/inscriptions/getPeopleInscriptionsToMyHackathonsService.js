import getPool from '../../database/getPool.js';

const getPeopleInscriptionsToMyHackathonsService = async (userId) => {
    if (!userId) {
        throw new Error('Falta el ID de usuario');
    }

    const pool = await getPool();


    const [myHackathons] = await pool.query(
        'SELECT id FROM hackathons WHERE creatorId = ?',
        [userId]
    );
    const hackathonIds = myHackathons.map(h => h.id);
    if (hackathonIds.length === 0) {
        return [];
    }


    const [inscriptions] = await pool.query(
        `SELECT 
            i.id,
            i.userId,
            u.username as userName,
            i.hackathonId,
            h.name,
            h.description,
            h.modality,
            h.onlineUrl,
            h.location,
            h.startDate,
            h.endDate
        FROM hackathon_user_registrations i
        JOIN users u ON i.userId = u.id
        JOIN hackathons h ON i.hackathonId = h.id
        WHERE i.hackathonId IN (?)
        `,
        [hackathonIds]
    );

    return inscriptions;
};

export default getPeopleInscriptionsToMyHackathonsService;