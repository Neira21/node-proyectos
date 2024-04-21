const {Book}  = require('../models/book.model');

const getBook = async (req, res, next) => {
  let book;
  const { id } = req.params;
  //si no machea con la expresión de 24 caracteres
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "El id del libro no es válido" });
  }
  try {
    book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  req.book = book;
  next();
};

module.exports = getBook;