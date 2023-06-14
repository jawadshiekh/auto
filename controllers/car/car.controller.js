const carService = require("../../services/car/car.service");

const {
    CAR_RESPONSES,
    genericResponse,
} = require("../../constants/responses");

const getAllCars = async (req, res) => {
  try {
    const result = await carService.getAllCars();

    if (!result.length) {
      const response = genericResponse(
        404,
        false,
        null,
        CAR_RESPONSES.NOT_FOUND
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

const getSingleCar = async (req, res) => {
  const id = req.params.carId;

  try {
    const car = await carService.getAllCars(id);

    if (!car) {
      const response = genericResponse(
        404,
        false,
        null,
        CAR_RESPONSES.NOT_FOUND
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

const createCar = async (req, res) => {
  try {
    await carService.createCar(req.body);

    const response = genericResponse(
      201,
      true,
      null,
      null,
      CAR_RESPONSES.CREATE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateCar = async (req, res) => {
  const id = req.params.carId;

  try {
    const hasUpdated = await carService.updateCar(id, req.body);

    if (!hasUpdated) {
        const response = genericResponse(
            404,
            false,
            null,
            null,
            CAR_RESPONSES.FAIL
        );
        return res.status(response.status.code).json(response);
    }

    const response = genericResponse(
      200,
      true,
      null,
      null,
      CAR_RESPONSES.UPDATE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(500, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

const deleteCar = async (req, res) => {
  const id = req.params.carId;

  try {
    const hasDeleted = await carService.deleteCar(id);

    if (!hasDeleted) {
      const response = genericResponse(404, false, null, CAR_RESPONSES.FAIL);
      return res.status(response.status.code).json(response);
    }

    const response = genericResponse(
      200,
      true,
      null,
      null,
      CAR_RESPONSES.DELETE_SUCCESS
    );
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = genericResponse(statusCode, false, null, error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllCars,
  getSingleCar,
  createCar,
  updateCar,
  deleteCar,
};
