import getPool from '../../database/getPool.js';

const updateUserService = async (email, username, firstName, lastName, id) => {
    const pool = await getPool();

    const [users] = await pool.query(
        'SELECT email, username, firstName, lastName FROM users WHERE id = ?',
        [id]
    );

    if (!users || users.length === 0) throw new Error('Usuario no encontrado');

    const currentUser = users[0];

    const updateData = {
        email: email || currentUser.email,
        username: username || currentUser.username,
        firstName: firstName || currentUser.firstName,
        lastName: lastName || currentUser.lastName,
    };

    await pool.query(
        `
            UPDATE users
            SET email=?, username=?, firstName=?, lastName=?
            WHERE id=?
        `,
        [
            updateData.email,
            updateData.username,
            updateData.firstName,
            updateData.lastName,
            id,
        ]
    );
};

export default updateUserService;
