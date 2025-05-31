import bcrypt from 'bcrypt';
import getPool from './getPool.js';
import { MYSQL_DATABASE, ADMIN_PASSWORD } from '../../env.js';

const initDb = async () => {
    try {
        let pool = await getPool();

        await pool.query(`USE ${MYSQL_DATABASE}`);

        console.log('Eliminando tablas');

        await pool.query(
            `DROP TABLE IF EXISTS hackathon_user_rankings, hackathon_user_rating, hackathon_user_registrations, hackathon_technologies, hackathon_attachments, hackathons, users, technologies, topics;`
        );

        console.log('Creando tablas');

        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS topics (
                    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                    name VARCHAR(50) NOT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `
        );

        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS technologies (
                    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                    name VARCHAR(50) NOT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `
        );

        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS users (
                    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    firstName VARCHAR(50),
                    lastName VARCHAR (50),
                    avatar VARCHAR(255),
                    role ENUM('admin','dev') DEFAULT 'dev',
                    active BOOLEAN DEFAULT FALSE,
                    registrationCode CHAR(30),
                    recoverPassCode CHAR(30),
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `
        );

        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS hackathons (
                    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                    name VARCHAR(100) NOT NULL,
                    description TEXT,
                    modality ENUM('online', 'onsite') NOT NULL,
                    location VARCHAR(100),
                    onlineUrl VARCHAR(100),
                    startDate TIMESTAMP NOT NULL,
                    endDate TIMESTAMP NOT NULL,
                    topicId INT NOT NULL,
                    FOREIGN KEY (topicId) REFERENCES topics(id) ON DELETE CASCADE,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `
        );

        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS hackathon_attachments (
                    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                    fileUrl VARCHAR(255) NOT NULL,
                    fileType ENUM('image', 'document') NOT NULL,
                    hackathonId INT NOT NULL,
                    FOREIGN KEY (hackathonId) REFERENCES hackathons(id) ON DELETE CASCADE,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                );

            `
        );

        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS hackathon_technologies (
                    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                    hackathonId INT NOT NULL,
                    technologyId INT NOT NULL,
                    FOREIGN KEY (hackathonId) REFERENCES hackathons(id) ON DELETE CASCADE,
                    FOREIGN KEY (technologyId) REFERENCES technologies(id) ON DELETE CASCADE,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `
        );

        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS hackathon_user_registrations (
                    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                    registrationCode CHAR(50),
                    userId INT NOT NULL,
                    hackathonId INT NOT NULL,
                    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (hackathonId) REFERENCES hackathons(id) ON DELETE CASCADE,
                    UNIQUE (userId, hackathonId),
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `
        );

        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS hackathon_user_rating (
                    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
                    rating TINYINT CHECK (rating BETWEEN 1 AND 5),
                    userId INT NOT NULL,
                    hackathonId INT NOT NULL,
                    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (hackathonId) REFERENCES hackathons(id) ON DELETE CASCADE,
                    UNIQUE (userId, hackathonId),
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `
        );

        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS hackathon_user_rankings (
                    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                    position INT NOT NULL,
                    userId INT NOT NULL,
                    hackathonId INT NOT NULL,
                    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (hackathonId) REFERENCES hackathons(id) ON DELETE CASCADE,
                    UNIQUE (userId, hackathonId),
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `
        );

        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS contact_messages (
                    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    message TEXT NOT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `
        );

        console.log('Tablas creadas');

        console.log('Insertando datos fijos');

        await pool.query(
            `
                INSERT INTO topics (name) VALUES
                ('Inteligencia Artificial'), ('Desarrollador de Software'), ('Desarrollo Web'), ('Data Science'), ('Ciberseguridad'), ('Realidad Virtual'), ('Robótica'), ('Hardware'), ('Gaming'), ('Lan Parties');
            `
        );

        await pool.query(
            `
                INSERT INTO technologies (name) VALUES
                ('Java'), ('Python'), ('Unreal Engine'), ('Unity'), ('Godot'), ('C++'), ('C#'), ('JavaScript'), ('SQL'), ('R'), ('TensorFlow'), ('Ruby'), ('Rust'), ('TypeScript'), ('Blender'), ('PyTorch'), ('React'), ('Angular'), ('PHP'), ('Cobol'), ('Excel'), ('Keras'), ('VHDL'), ('Verilog'), ('ROS'), ('Kali Linux'), ('Wireshark'), ('SteamCMD'), ('OBS Studio'), ('Parsec'), ('Battle.net'), ('GameRanger');
            `
        );

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

        await pool.query(
            `
                INSERT INTO users (email, username, password, role, active)
                VALUES (?, ?, ?, ?, ?)
            `,
            ['admin@hackathons.com', 'admin', hashedPassword, 'admin', true]
        );

        console.log('Datos insertados');

        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
initDb();
