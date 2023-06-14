const express = require("express");

const validateRequestBody = require("../../middleware/validateRequestBody.middleware");

const carCreateSchema = require("../../validations/cars/create.validation");
const carUpdateSchema = require("../../validations/cars/update.validation");

const {
    getAllCars,
    getSingleCar,
    createCar,
    updateCar,
    deleteCar
} = require("../../controllers/car/car.controller");

const router = express.Router();

router.get("/", getAllCars);
router.get("/:carId", getSingleCar);
router.post("/", validateRequestBody(carCreateSchema), createCar);
router.patch("/:carId", validateRequestBody(carUpdateSchema), updateCar);
router.delete("/:carId", deleteCar);

module.exports = router;
