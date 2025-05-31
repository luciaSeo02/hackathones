import getPool from "../../database/getPool.js";

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

    if(!user.length) throw generateErrorsUtils('Usuario no existe', 404);
    
    return user[0];
}

export default selectUserByIdService;
