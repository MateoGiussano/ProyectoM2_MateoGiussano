const express = require('express');
const authorsRouter = require('./routers/authors.router');
const postsRouter = require('./routers/posts.router');
const errorHandler = require('./middlewares/errorHandler');
const { swaggerUi, swaggerDocument } = require('./swagger');

const server = express();

server.use(express.json());
server.use('/authors', authorsRouter);
server.use('/posts', postsRouter);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(errorHandler);

module.exports = server;