const userService = require("../../services/user/user.service");

const {
    USER_RESPONSES,
    genericResponse,
} = require("../../constants/responses");

const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();

    if (!result.length) {
      const response = genericResponse(
        404,
        false,
        null,
        USER_RESPONSES.NOT_FOUND
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

const getSingleUser = async (req, res) => {
  const id = req.params.userId;

  try {
    const user = await userService.getAllUsers(id);

    if (!user) {
      const response = genericResponse(
        404,
        false,
        null,
        USER_RESPONSES.NOT_FOUND
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

const createUser = async (req, res) => {
  try {
    await userService.createUser(req.body);

    const response = genericResponse(
      201,
      true,
      null,
      null,
      USER_RESPONSES.CREATE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.userId;

  try {
    const hasUpdated = await userService.updateUser(id, req.body);

    if (!hasUpdated) {
        const response = genericResponse(
            404,
            false,
            null,
            null,
            USER_RESPONSES.FAIL
        );
        return res.status(response.status.code).json(response);
    }

    const response = genericResponse(
      200,
      true,
      null,
      null,
      USER_RESPONSES.UPDATE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.userId;

  try {
    const hasDeleted = await userService.deleteUser(id);

    if (!hasDeleted) {
      const response = genericResponse(404, false, null, USER_RESPONSES.FAIL);
      return res.status(response.status.code).json(response);
    }

    const response = genericResponse(
      200,
      true,
      null,
      null,
      USER_RESPONSES.DELETE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(statusCode, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
