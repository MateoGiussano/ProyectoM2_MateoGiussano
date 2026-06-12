const authorsService = require('../services/authors.service');

const getAll = async (req, res) => {
    try {
        const authors = await authorsService.getAll();
        res.status(200).json(authors);
      } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await authorsService.getById(id);
    if (!author) return res.status(404).json({ error: 'Author no encontrado' });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name y email son obligatorios' });
    const newAuthor = await authorsService.create({ name, email, bio });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;
    const updatedAuthor = await authorsService.update(id, { name, email, bio });
    if (!updatedAuthor) return res.status(404).json({ error: 'Author no encontrado' });
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await authorsService.remove(id);
    if (!deleted) return res.status(404).json({ error: 'Author no encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };