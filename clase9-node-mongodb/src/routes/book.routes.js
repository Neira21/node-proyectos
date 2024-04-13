const express = require("express");
const router = express.Router();
const { Book } = require("../models/book.model");

//middleware
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

//Obtener todos los libros
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    console.log("GET ALL", books);
    if (books.length === 0)
      return res.status(204).json({ message: "No hay libros" });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un libro por su id
router.get("/:id", getBook, async (req, res) => {
  res.json(req.book);
});

//Post de un libro
router.post("/", async (req, res) => {
  try {
    const { title, author, genre, publication_date } = req.body;
    console.log(title, author, genre, publication_date);
    if (!title || !author || !genre || !publication_date) {
      return res.status(400).json({
        message: "Los campos título, autor, género y fecha son obligatorios",
      });
    }
    const book = new Book({ title, author, genre, publication_date });
    const newBook = await book.save();
    console.log("POST", newBook);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", getBook, async (req, res) => {
  const { title, author, genre, publication_date } = req.body;
  const book = req.book;
  book.title = title || book.title;
  book.author = author || book.author;
  book.genre = genre || book.genre;
  book.publication_date = publication_date || book.publication_date;
  try {
    const updatedBook = await book.save();
    console.log("PUT", updatedBook);
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getBook, async (req, res) => {
  if(!req.body.title && !req.body.author && !req.body.genre && !req.body.publication_date){
    return res.status(400).json({message: "No hay campos a actualizar, debe enviar al menos uno (Título, Autor, Género o Fecha de publicación)"})
  }
  try {
    const { title, author, genre, publication_date } = req.body;
    const book = req.book;
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.publication_date = publication_date || book.publication_date;
    const updatedBook = await book.save();
    console.log("PUT", updatedBook);
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// Eliminar un libro por su id
router.delete("/:id", getBook, async(req, res) => {
  try {
    const book = req.book
    await book.deleteOne({
      _id: book._id
    });
    res.json({message: `El libro ${book.title}eliminado correctamente`})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = router;
