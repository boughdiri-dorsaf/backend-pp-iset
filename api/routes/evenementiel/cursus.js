const express = require("express");
const router = express.Router();
const cursusController=require('../../controllers/evenementiel/cursus')
const { checkToken } = require("../../auth/token_validation")


router.post("/", checkToken, cursusController.createCursus);

router.get("/", checkToken, cursusController.getListCursus);

router.get("/:id", checkToken, cursusController.getCursusById);

router.patch("/", checkToken, cursusController.updateCursus);

router.delete("/:id", checkToken, cursusController.deleteCursus);

module.exports = router;
  