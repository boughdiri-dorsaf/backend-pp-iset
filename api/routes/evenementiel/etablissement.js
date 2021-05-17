const express = require("express");
const router = express.Router();
const etablissementController=require('../../controllers/evenementiel/etablissement')

const { checkToken } = require("../../auth/token_validation")

router.post("/", checkToken, etablissementController.createEtablissement);

router.get("/", checkToken, etablissementController.getListEtablissement);

router.get("/:id", checkToken, etablissementController.getEtablissementById);

router.patch("/", checkToken, etablissementController.updateEtablissement);

router.delete("/:id", checkToken, etablissementController.deleteEtablissement);

module.exports = router; 