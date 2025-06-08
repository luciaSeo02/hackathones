import bcrypt from 'bcrypt';
import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorUtils.js';

const changePasswordService = async (userId, currentPassword, newPassword) => {
    const pool = await getPool();

    if (!currentPassword || !newPassword) {
        throw generateErrorsUtils(
            'La contraseña actual y la nueva contraseña son requeridas',
            400
        );
    }

    if (newPassword.length < 6) {
        throw generateErrorsUtils(
            'La nueva contraseña debe tener al menos 6 caracteres',
            400
        );
    }

    const [user] = await pool.query(
        `
            SELECT password FROM users WHERE id = ?
        `,
        [userId]
    );

    if (user.length === 0) {
        throw generateErrorsUtils('Usuario no encontrado', 404);
    }

    const isValidPassword = await bcrypt.compare(
        currentPassword,
        user[0].password
    );

    if (!isValidPassword) {
        throw generateErrorsUtils('La contraseña actual es incorrecta', 401);
    }

    const isSame = await bcrypt.compare(newPassword, user[0].password);
    if (isSame) {
        throw generateErrorsUtils(
            'La contraseña tiene que ser distinta a la anterior',
            400
        );
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
        `
            UPDATE users SET password = ? WHERE id = ?
        `,
        [hashedNewPassword, userId]
    );
};

export default changePasswordService;
