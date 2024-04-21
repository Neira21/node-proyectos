const express = require("express");
const router = express.Router();
const bookController = require("../controllers/BookController");
const getBook = require("../middlewares/getBook");
const subirImagen = require("../middlewares/storage") 


//Obtener todos los libros
router.get("/", bookController.getAllBooks);

// Obtener un libro por su id
router.get("/:id", getBook, bookController.getBookById);

//Post de un libro
router.post("/", subirImagen.single("imagen"), bookController.createBook );

router.put("/:id", getBook, subirImagen.single("imagen"), bookController.updateBook);

router.patch("/:id", getBook, subirImagen.single("imagen"), bookController.updatePartialBook);

// Eliminar un libro por su id
router.delete("/:id", getBook, bookController.deleteBook);

module.exports = router;
