const BookModel = require("../models/bookModel");

class BookController {
  static async getAllBooks(req, res) {
    try {
      const books = await BookModel.getAllBooks();
      res.status(200).json(books);
    } catch (err) {
      console.error("Error fetching books:", err);
      res.status(500).json({ error: err.message });
    }
  }

  static async createBook(req, res) {
    try {
      const { title, author, genre, description_ } = req.body;
      const book = await BookModel.createBook(title, author, genre, description_);
      res.status(201).json(book);
    } catch (err) {
      console.error("Error adding book:", err);
      res.status(500).json({ error: err.message });
    }
  }

  static async updateBook(req, res) {
    try {
      const { id } = req.params;
      const { title, author, genre, description_ } = req.body;
      const book = await BookModel.updateBook(id, title, author, genre, description_);
      res.status(200).json(book);
    } catch (err) {
      console.error("Error updating book:", err);
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const response = await BookModel.deleteBook(id);
      res.status(200).json(response);
    } catch (err) {
      console.error("Error deleting book:", err);
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = BookController;
