import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description_, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:2999/book");
      setBooks(response.data);
    } catch (error) {
      console.error("There was an error fetching the books!", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      title,
      author,
      genre,
      description_,
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:2999/book/${editingId}`, bookData);
      } else {
        await axios.post("http://localhost:2999/book", bookData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      resetForm();
      fetchBooks();
    } catch (error) {
      console.error("Error saving book!", error);
    }
  };

  const handleEdit = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setDescription(book.description_);
    setEditingId(book.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:2999/book/${id}`);
        fetchBooks();
      } catch (error) {
        console.error("Error deleting book!", error);
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setDescription("");
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Book Catalog
          </h1>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <textarea
                placeholder="Description"
                value={description_}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              {editingId ? "Update Book" : "Add Book"}
            </button>
          </form>

          {/* Book List Section */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Book List
          </h2>

          {books.length === 0 ? (
            <p className="text-center text-gray-500">No books in the catalog</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Genre:</strong> {book.genre || "N/A"}
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {book.description_}
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEdit(book)}
                      className="flex-1 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
