const watchService = require("../../services/watch/watch.service");

const {
    WATCH_RESPONSES,
    genericResponse,
} = require("../../constants/responses");

const getAllWatches = async (req, res) => {
  try {
    const result = await watchService.getAllWatches();

    if (!result.length) {
      const response = genericResponse(
        404,
        false,
        null,
        WATCH_RESPONSES.NOT_FOUND
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

const getSingleWatch = async (req, res) => {
  const id = req.params.watchId;

  try {
    const watch = await watchService.getAllWatches(id);

    if (!watch) {
      const response = genericResponse(
        404,
        false,
        null,
        WATCH_RESPONSES.NOT_FOUND
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

const createWatch = async (req, res) => {
  try {
    await watchService.createWatch(req.body);

    const response = genericResponse(
      201,
      true,
      null,
      null,
      WATCH_RESPONSES.CREATE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateWatch = async (req, res) => {
  const id = req.params.watchId;

  try {
    const hasUpdated = await watchService.updateWatch(id, req.body);

    if (!hasUpdated) {
        const response = genericResponse(
            404,
            false,
            null,
            null,
            WATCH_RESPONSES.FAIL
        );
        return res.status(response.status.code).json(response);
    }

    const response = genericResponse(
      200,
      true,
      null,
      null,
      WATCH_RESPONSES.UPDATE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const deleteWatch = async (req, res) => {
  const id = req.params.watchId;

  try {
    const hasDeleted = await watchService.deleteWatch(id);

    if (!hasDeleted) {
      const response = genericResponse(404, false, null, WATCH_RESPONSES.FAIL);
      return res.status(response.status.code).json(response);
    }

    const response = genericResponse(
      200,
      true,
      null,
      null,
      WATCH_RESPONSES.DELETE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(statusCode, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllWatches,
  getSingleWatch,
  createWatch,
  updateWatch,
  deleteWatch,
};
