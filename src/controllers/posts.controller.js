const postsService = require('../services/posts.service');

const getAll = async (req, res, next) => {
  try {
    const posts = await postsService.getAll();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postsService.getById(id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const getByAuthorId = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const posts = await postsService.getByAuthorId(authorId);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { title, content, author_id, published } = req.body;
    if (!title || !content || !author_id) return res.status(400).json({ error: 'title, content y author_id son obligatorios' });
    const newPost = await postsService.create({ title, content, author_id, published });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, author_id, published } = req.body;
    const updatedPost = await postsService.update(id, { title, content, author_id, published });
    if (!updatedPost) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await postsService.remove(id);
    if (!deleted) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, getByAuthorId, create, update, remove };