const express = require("express");

const validateRequestBody = require("../../middleware/validateRequestBody.middleware");

const userCreateSchema = require("../../validations/users/create.validation");
const userUpdateSchema = require("../../validations/users/update.validation");

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require("../../controllers/user/user.controller");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getSingleUser);
router.post("/", validateRequestBody(userCreateSchema), createUser);
router.patch("/:userId", validateRequestBody(userUpdateSchema), updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
