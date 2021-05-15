const express = require("express");
const router = express.Router();
const etablissementController=require('../../controllers/evenementiel/etablissement')


router.post("/", etablissementController.createEtablissement);

router.get("/", etablissementController.getListEtablissement);

router.get("/:id", etablissementController.getEtablissementById);

router.patch("/", etablissementController.updateEtablissement);

router.delete("/:id", etablissementController.deleteEtablissement);

module.exports = router; 