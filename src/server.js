const express = require('express');
const authorsRouter = require('./routers/authors.router');

const server = express();

server.use(express.json());
server.use('/authors', authorsRouter);

module.exports = server;