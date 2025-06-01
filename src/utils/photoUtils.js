import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import generateErrorsUtils from '../utils/generateErrorUtils.js';

const { UPLOAD_DIR } = process.env;

export const savePhotoUtils = async (img, width) => {
    try {
        const uploadDir = path.join(process.cwd(), `./src/${UPLOAD_DIR}`);

        try {
            await fs.access(uploadDir);
        } catch (error) {
            await fs.mkdir(uploadDir);
        }

        const imgSharp = sharp(img.data);

        imgSharp.resize(width);

        const imgName = `${uuidv4()}.jpg`;

        const pathImg = path.join(uploadDir, imgName);

        await imgSharp.toFile(pathImg);

        return imgName;
    } catch (error) {
        console.log(error);
        throw generateErrorsUtils('Error al guardar imagen', 500);
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
