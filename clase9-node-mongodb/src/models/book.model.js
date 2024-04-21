const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    genre: String,
    publication_date: String,
    imagen: String
  }
)

module.exports = {
  Book: mongoose.model('Book', bookSchema)
}
