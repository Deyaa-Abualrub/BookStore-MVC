const express = require("express");
const BookController = require("../controllers/bookController");

const router = express.Router();

router.get("/", BookController.getAllBooks);
router.post("/", BookController.createBook);
router.put("/:id", BookController.updateBook);
router.delete("/:id", BookController.deleteBook);

module.exports = router;
