const postsService = require('../services/posts.service');

const getAll = async (req, res) => {
  try {
    const posts = await postsService.getAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsService.getById(id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;
    const posts = await postsService.getByAuthorId(authorId);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { title, content, author_id, published } = req.body;
    if (!title || !content || !author_id) return res.status(400).json({ error: 'title, content y author_id son obligatorios' });
    const newPost = await postsService.create({ title, content, author_id, published });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author_id, published } = req.body;
    const updatedPost = await postsService.update(id, { title, content, author_id, published });
    if (!updatedPost) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await postsService.remove(id);
    if (!deleted) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, getByAuthorId, create, update, remove };