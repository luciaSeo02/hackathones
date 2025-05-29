import mysql from 'mysql2/promise';
import generateErrorUtils from '../utils/generateErrorUtils.js';

import {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MYSQL_PORT,
} from '../../env.js';

let pool;

const getPool = async () => {
    try {
        if (!pool) {
            const poolTemp = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                port: MYSQL_PORT || 3306,
                timezone: 'Z',
            });

            await poolTemp.query(
                `
                    CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}
                `
            );
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                database: MYSQL_DATABASE,
                port: MYSQL_PORT || 3306,
                timezone: 'Z',
            });
        }

        return await pool;
    } catch (error) {
        console.log(error);
        throw generateErrorsUtils(
            'Error conectado a MySQL o no se encuentra la base de datos',
            400
        );
    }
};

export default getPool;
