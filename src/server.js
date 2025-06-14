import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';

import routes from './router/index.js';

import handleErrors from './errors/handleErrors.js';
import notFoundError from './errors/notFoundError.js';

const server = express();

server.use(morgan('dev'));

server.use(cors());

server.use(express.json());

server.use(fileUpload());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(
    '/uploads/avatar',
    express.static(path.join(__dirname, 'uploads/avatar'))
);

const estaticDir = path.join(process.cwd(), '.src/uploads');
server.use('/uploads', express.static(estaticDir));

server.use(routes);

server.use(handleErrors);

server.use(notFoundError);

export default server;
