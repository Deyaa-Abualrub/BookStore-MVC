const pool = require("../config/db");

class BookModel {
  static async getAllBooks() {
    const result = await pool.query("SELECT * FROM books");
    return result.rows;
  }

  static async createBook(title, author, genre, description_) {
    const result = await pool.query(
      "INSERT INTO books (title, author, genre, description_) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, author, genre, description_]
    );
    return result.rows[0];
  }

  static async updateBook(id, title, author, genre, description_) {
    const result = await pool.query(
      "UPDATE books SET title = $1, author = $2, genre = $3, description_ = $4 WHERE id = $5 RETURNING *",
      [title, author, genre, description_, id]
    );
    return result.rows[0];
  }

  static async deleteBook(id) {
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
    return { message: "Book deleted successfully" };
  }
}

module.exports = BookModel;
