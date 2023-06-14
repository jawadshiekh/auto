const uhvService = require("../../services/uhv/uhv.service");

const {
    UHV_RESPONSES,
    genericResponse,
} = require("../../constants/responses");

const getAllUhvs = async (req, res) => {
  try {
    const result = await uhvService.getAllUhvs();

    if (!result.length) {
      const response = genericResponse(
        404,
        false,
        null,
        UHV_RESPONSES.NOT_FOUND
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

const getSingleUhv = async (req, res) => {
  const id = req.params.uhvId;

  try {
    const uhv = await uhvService.getAllUhvs(id);

    if (!uhv) {
      const response = genericResponse(
        404,
        false,
        null,
        UHV_RESPONSES.NOT_FOUND
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

const createUhv = async (req, res) => {
  try {
    await uhvService.createUhv(req.body);

    const response = genericResponse(
      201,
      true,
      null,
      null,
      UHV_RESPONSES.CREATE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateUhv = async (req, res) => {
  const id = req.params.uhvId;

  try {
    const hasUpdated = await uhvService.updateUhv(id, req.body);

    if (!hasUpdated) {
        const response = genericResponse(
            404,
            false,
            null,
            null,
            UHV_RESPONSES.FAIL
        );
        return res.status(response.status.code).json(response);
    }

    const response = genericResponse(
      200,
      true,
      null,
      null,
      UHV_RESPONSES.UPDATE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const deleteUhv = async (req, res) => {
  const id = req.params.uhvId;

  try {
    const hasDeleted = await uhvService.deleteUhv(id);

    if (!hasDeleted) {
      const response = genericResponse(404, false, null, UHV_RESPONSES.FAIL);
      return res.status(response.status.code).json(response);
    }

    const response = genericResponse(
      200,
      true,
      null,
      null,
      UHV_RESPONSES.DELETE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(statusCode, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllUhvs,
  getSingleUhv,
  createUhv,
  updateUhv,
  deleteUhv,
};
