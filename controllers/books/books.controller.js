const booksService = require("../../services/books/books.service");

const {
    BOOKS_RESPONSES,
    genericResponse,
} = require("../../constants/responses");

const getAllBooks = async (req, res) => {
  try {
    const result = await booksService.getAllBooks();

    if (!result.length) {
      const response = genericResponse(
        404,
        false,
        null,
        BOOKS_RESPONSES.NOT_FOUND
      );
      return res.status(response.status.code).json(response);
    }

    const response = genericResponse(200, true, result);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const getSingleBooks = async (req, res) => {
  const id = req.params.booksId;

  try {
    const books = await booksService.getAllBooks(id);

    if (!books) {
      const response = genericResponse(
        404,
        false,
        null,
        BOOKS_RESPONSES.NOT_FOUND
      );
      return res.status(response.status.code).json(response);
    }

    const response = genericResponse(200, true, result);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const createBooks = async (req, res) => {
  try {
    await booksService.createBooks(req.body);

    const response = genericResponse(
      201,
      true,
      null,
      null,
      BOOKS_RESPONSES.CREATE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateBooks = async (req, res) => {
  const id = req.params.booksId;

  try {
    const hasUpdated = await booksService.updateBooks(id, req.body);

    if (!hasUpdated) {
        const response = genericResponse(
            404,
            false,
            null,
            null,
            BOOKS_RESPONSES.FAIL
        );
        return res.status(response.status.code).json(response);
    }

    const response = genericResponse(
      200,
      true,
      null,
      null,
      BOOKS_RESPONSES.UPDATE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const deleteBooks = async (req, res) => {
  const id = req.params.booksId;

  try {
    const hasDeleted = await booksService.deleteBooks(id);

    if (!hasDeleted) {
      const response = genericResponse(404, false, null, BOOKS_RESPONSES.FAIL);
      return res.status(response.status.code).json(response);
    }

    const response = genericResponse(
      200,
      true,
      null,
      null,
      BOOKS_RESPONSES.DELETE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(statusCode, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllBooks,
  getSingleBooks,
  createBooks,
  updateBooks,
  deleteBooks,
};
