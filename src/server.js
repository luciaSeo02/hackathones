import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fileUpload from 'express-fileupload';

import routes from './router/index.js';

import handleErrors from './errors/handleErrors.js';
import notFoundError from './errors/notFoundError.js';

const server = express();

server.use(morgan('dev'));

//cors
server.use(cors());

// parseo del body(JSON)
server.use(express.json());

// Upload 
server.use(fileUpload());

// Directorios estáticos
const estaticDir = path.join(process.cwd(), '.src/uploads');
server.use('/uploads', express.static(estaticDir));

server.use(routes);

// Gestión de errores
server.use(handleErrors);

// Ruta no encontrada
server.use(notFoundError);

export default server;
