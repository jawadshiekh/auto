const express = require("express");

const validateRequestBody = require("../../middleware/validateRequestBody.middleware");

const watchCreateSchema = require("../../validations/watches/create.validation");
const watchUpdateSchema = require("../../validations/watches/update.validation");

const {
    getAllWatches,
    getSingleWatch,
    createWatch,
    updateWatch,
    deleteWatch
} = require("../../controllers/watch/watch.controller");

const router = express.Router();

router.get("/", getAllWatches);
router.get("/:watchId", getSingleWatch);
router.post("/", validateRequestBody(watchCreateSchema), createWatch);
router.patch("/:watchId", validateRequestBody(watchUpdateSchema), updateWatch);
router.delete("/:watchId", deleteWatch);

module.exports = router;
