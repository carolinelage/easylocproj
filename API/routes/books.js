const express = require('express');
const router = express.Router();
const { Books, RentalMode, BookRentalMode } = require('../models');

// Rota para buscar livros disponíveis
router.get('/', async (req, res) => {
  try {
    const books = await Books.findAll({
      where: { available: true },
      include: [
        {
          model: BookRentalMode,
          include: [RentalMode],
        },
      ],
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para buscar detalhes de um livro específico
router.get('/:id', async (req, res) => {
  try {
    const book = await Books.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: BookRentalMode,
          include: [RentalMode],
        },
      ],
    });

    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
