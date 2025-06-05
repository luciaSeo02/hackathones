import { UPLOAD_DIR } from '../../env.js';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import generateErrorsUtils from '../utils/generateErrorUtils.js';

export const savePhotoUtils = async (img, width) => {
    try {
        const uploadDir = path.join(process.cwd(), `./src/${UPLOAD_DIR}/avatar`);

        try {
            await fs.access(uploadDir);
        } catch (error) {
            await fs.mkdir(uploadDir,{ recursive: true });
        }

        const imgSharp = sharp(img.data);

        imgSharp.resize(width).toFormat('jpg',{ quality: 100 });

        const imgName = `${uuidv4()}.jpg`;

        const pathImg = path.join(uploadDir, imgName);

        await imgSharp.toFile(pathImg);

        return imgName;
    } catch (error) {
        console.log(error);
        throw generateErrorsUtils('Error al guardar imagen', 500);
    }
};

export const saveHackathonAttachment = async (file, hackathonId) => {
    try {
        const uploadDir = path.join(process.cwd(), `./src/${UPLOAD_DIR}/hackathons/${hackathonId}`);

        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const ext = path.extname(file.name) || '.dat';
        const fileName = `${uuidv4()}${ext}`;
        const filePath = path.join(uploadDir, fileName);

        await fs.writeFile(filePath, file.data);

        return `uploads/hackathons/${hackathonId}/${fileName}`;
    } catch (error) {
        throw generateErrorsUtils('Error al guardar el archivo', 500);
    }
};

export const deletePhotoUtils = async (imgName) => {
    try {
        const imgPath = path.join(
            process.cwd(),
            `./src/${UPLOAD_DIR}`,
            imgName
        );

        try {
            await fs.access(imgPath);
        } catch (error) {
            return;
        }

        await fs.unlink(imgPath);
    } catch (error) {
        console.log(error);
        throw generateErrorsUtils('Error al eliminar imagen', 500);
    }
};
