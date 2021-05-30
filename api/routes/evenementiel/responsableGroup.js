const express = require("express");
const router = express.Router();
const responsableGroupController=require('../../controllers/evenementiel/responsableGroup')

const { checkToken } = require("../../auth/token_validation")

router.post("/", checkToken, responsableGroupController.create);

router.get("/", checkToken, responsableGroupController.getListResponsableGroup);

router.get("/:id", checkToken, responsableGroupController.getResponsableGroupById);

router.patch("/", checkToken, responsableGroupController.update);

router.delete("/:id", checkToken, responsableGroupController.deleteResponsableGroup);

module.exports = router;
