import bcrypt from 'bcrypt';
import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorUtils.js';
import selectUserByEmailService from './selectUserByEmailService.js';

const updatePasswordService = async (email, recoverPassCode, newPassword) => {
    const pool = await getPool();

    const user = await selectUserByEmailService(email);

    if (!user || user.recoverPassCode !== recoverPassCode) {
        throw generateErrorsUtils(
            'Email o código de recuperación incorrectos.',
            409
        );
    }

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
        throw generateErrorsUtils(
            'La nueva contraseña no puede ser igual a la anterior',
            400
        );
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
        `
            UPDATE users
            SET password=?, recoverPassCode=null
            WHERE recoverPassCode=?
        `,
        [hashPassword, recoverPassCode]
    );
};

export default updatePasswordService;
