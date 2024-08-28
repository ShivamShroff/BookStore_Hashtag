const express = require("express");
const router = express.Router();
const booksController = require("../controller/bookController");

router.get("/books",booksController.getBooks);
router.post("/add-book",booksController.addBook);
router.put("/update-book/:id",booksController.updateBook);
router.post("/purchase",booksController.purchaseBook);

module.exports = router;