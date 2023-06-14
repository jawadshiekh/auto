const express = require("express");

const validateRequestBody = require("../../middleware/validateRequestBody.middleware");

const booksCreateSchema = require("../../validations/books/create.validation");
const booksUpdateSchema = require("../../validations/books/update.validation");

const {
    getAllBooks,
    getSingleBooks,
    createBooks,
    updateBooks,
    deleteBooks
} = require("../../controllers/books/books.controller");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:booksId", getSingleBooks);
router.post("/", validateRequestBody(booksCreateSchema), createBooks);
router.patch("/:booksId", validateRequestBody(booksUpdateSchema), updateBooks);
router.delete("/:booksId", deleteBooks);

module.exports = router;
