const {Book}  = require('../models/book.model');
const fs = require('fs');

const eliminarImagen = async (id) => {
  const juego = await Book.findById(id);
  const img = juego.imagen;
  fs.unlinkSync('./public' + img)
}

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    console.log("GET ALL", books);
    if (books.length === 0)
      return res.status(204).json({ message: "No hay libros" });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getBookById = async (req, res) => {
  res.json(req.book);
}


const createBook = async (req, res) => {
  try {
    const { title, author, genre, publication_date } = req.body;

    // agregar imagen con el middleware de multer

    console.log(title, author, genre, publication_date);
    if (!title || !author || !genre || !publication_date) {
      return res.status(400).json({
        message: "Los campos título, autor, género y fecha son obligatorios",
      });
    }
    const book = new Book({ title, author, genre, publication_date, imagen: '/uploads/'+ req.file.filename });
    const newBook = await book.save();
    console.log("POST", newBook);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const updateBook = async (req, res) => {
  const { title, author, genre, publication_date } = req.body;
  const book = req.book;

  if(req.file !== null){
    //fs.unlinkSync('./public' + book.imagen)
    await eliminarImagen(book._id)
    book.imagen = '/uploads/' + req.file.filename
  }

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
}

const updatePartialBook = async (req, res) => {
  if(!req.body.title && !req.body.author && !req.body.genre && !req.body.publication_date && !req.file){
    return res.status(400).json({message: "No hay campos a actualizar, debe enviar al menos uno (Título, Autor, Género o Fecha de publicación)"})
  }
  try {
    const { title, author, genre, publication_date } = req.body;
    const book = req.book;
    if(req.file !== undefined){
      await eliminarImagen(book._id)
      book.imagen = '/uploads/' + req.file.filename
    }
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.publication_date = publication_date || book.publication_date;
    const updatedBook = await book.save();
    console.log("PATCH", updatedBook);
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message, error: "error" });
  }
}


const deleteBook = async(req, res) => {
  try {
    const book = req.book
    await eliminarImagen(book._id)
    await book.deleteOne({
      _id: book._id
    });
    res.json({message: `El libro ${book.title}eliminado correctamente`})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  updatePartialBook,
  deleteBook
}
