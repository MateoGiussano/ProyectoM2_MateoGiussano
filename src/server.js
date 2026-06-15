const express = require('express');
const authorsRouter = require('./routers/authors.router');
const postsRouter = require('./routers/posts.router');

const server = express();

server.use(express.json());
server.use('/authors', authorsRouter);
server.use('/posts', postsRouter);

module.exports = server;