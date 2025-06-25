import getPool from '../../database/getPool.js';

const getPeopleInscriptionsToMyHackathonsService = async (
    userId,
    limit = 24,
    page = 1
) => {
    if (!userId) {
        throw new Error('Falta el ID de usuario');
    }

    const pool = await getPool();

    const [myHackathons] = await pool.query(
        'SELECT id FROM hackathons WHERE creatorId = ?',
        [userId]
    );
    const hackathonIds = myHackathons.map((h) => h.id);
    if (hackathonIds.length === 0) {
        return { inscriptions: [], total: 0 };
    }

    const [totalRows] = await pool.query(
        `SELECT COUNT(*) as total
        FROM hackathon_user_registrations i
        JOIN users u ON i.userId = u.id
        JOIN hackathons h ON i.hackathonId = h.id
        WHERE i.hackathonId IN (?)`,
        [hackathonIds]
    );
    const total = totalRows[0]?.total || 0;

    const offset = (Number(page) - 1) * Number(limit);

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
        ORDER BY h.startDate DESC
        LIMIT ? OFFSET ?
        `,
        [hackathonIds, Number(limit), offset]
    );

    return { inscriptions, total };
};

export default getPeopleInscriptionsToMyHackathonsService;
