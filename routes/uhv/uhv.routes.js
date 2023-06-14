const express = require("express");

const validateRequestBody = require("../../middleware/validateRequestBody.middleware");

const uhvCreateSchema = require("../../validations/uhvs/create.validation");
const uhvUpdateSchema = require("../../validations/uhvs/update.validation");

const {
    getAllUhvs,
    getSingleUhv,
    createUhv,
    updateUhv,
    deleteUhv
} = require("../../controllers/uhv/uhv.controller");

const router = express.Router();

router.get("/", getAllUhvs);
router.get("/:uhvId", getSingleUhv);
router.post("/", validateRequestBody(uhvCreateSchema), createUhv);
router.patch("/:uhvId", validateRequestBody(uhvUpdateSchema), updateUhv);
router.delete("/:uhvId", deleteUhv);

module.exports = router;
