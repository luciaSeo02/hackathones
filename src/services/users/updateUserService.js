import bcrypt from 'bcrypt';
import getPool from '../../database/getPool.js';

const updateUserService = async (
    email,
    username,
    firstName,
    lastName,
    avatar,
    password,
    id
) => {
    const pool = await getPool();

   
    const [currentUser] = await pool.query(
        'SELECT email, username, firstName, lastName, avatar FROM users WHERE id = ?',
        [id]
    );

    const updateData = {
        email: email || currentUser[0].email,
        username: username || currentUser[0].username,
        firstName: firstName || currentUser[0].firstName,
        lastName: lastName || currentUser[0].lastName,
        avatar: avatar || currentUser[0].avatar,
    };

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            `
                UPDATE users
                SET email=?, username=?, firstName=?, lastName=?, avatar=?, password=?
                WHERE id=?
            `,
            [
                updateData.email,
                updateData.username,
                updateData.firstName,
                updateData.lastName,
                updateData.avatar,
                hashedPassword,
                id,
            ]
        );
    } else {
        await pool.query(
            `
                UPDATE users
                SET email=?, username=?, firstName=?, lastName=?, avatar=?
                WHERE id=?
            `,
            [
                updateData.email,
                updateData.username,
                updateData.firstName,
                updateData.lastName,
                updateData.avatar,
                id,
            ]
        );
    }
};

export default updateUserService;
