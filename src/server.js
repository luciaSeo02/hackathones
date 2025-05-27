import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fileUpload from 'express-fileupload';


import routes from './router/index.js';

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.use(fileUpload());

server.use(routes);

export default server;

