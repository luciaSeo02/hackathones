import { UPLOAD_DIR } from '../../env.js';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import generateErrorsUtils from '../utils/generateErrorUtils.js';


export const validateImage = (file) => {

    const types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
    
    if (!types.includes(file.mimetype)) {
        throw generateErrorsUtils('Tipo de archivo no permitido. Solo se permiten imágenes JPG, PNG, WebP', 400);
    }
    
    const extension = path.extname(file.name).toLowerCase();

    if (!extensions.includes(extension)) {
        throw generateErrorsUtils('Extensión no válida. Solo se permiten: .jpg, .jpeg, .png, .webp', 400);
    }
};

export const savePhotoUtils = async (img, width) => {
    try {

        validateImage(img);

        const uploadDir = path.join(
            process.cwd(),
            `./src/${UPLOAD_DIR}/avatar`
        );

        try {
            await fs.access(uploadDir);
        } catch (error) {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const imgSharp = sharp(img.data);

        imgSharp.resize(width).toFormat('jpg', { quality: 100 });

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
        validateImage(file);

        const uploadDir = path.join(
            process.cwd(),
            `./src/${UPLOAD_DIR}/hackathons/${hackathonId}`
        );

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
            `./src/${UPLOAD_DIR}/avatar`,
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

export const deleteHackathonAttachment = async (fileName) => {
    try {
        const filePath = path.join(process.cwd(), './src', fileName);

        try {
            await fs.access(filePath);

        } catch (error) {
            return;
        }

        await fs.unlink(filePath);
        
    } catch (error) {
        console.log(error);
        throw generateErrorsUtils('Error al eliminar archivo', 500);
    }
}