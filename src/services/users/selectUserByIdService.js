import getPool from '../../database/getPool.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';

const selectUserByIdService = async (userId) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
            SELECT id, email, username, firstName, lastName, avatar
            FROM users
            WHERE id=?
        `,
        [userId]
    );

    if (!user.length) throw generateErrorUtils('Usuario no existe', 404);

    return user[0];
};

export default selectUserByIdService;
