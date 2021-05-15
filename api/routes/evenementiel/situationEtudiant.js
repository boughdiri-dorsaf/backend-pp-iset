const express = require("express");
const router = express.Router();
const situationController=require('../../controllers/evenementiel/situationEtudiant')

router.post("/", situationController.createSituation);

router.get("/", situationController.getListSituation);

router.get("/:id", situationController.getSituationById);

router.patch("/", situationController.updateSituation);

router.delete("/:id", situationController.deleteSituation);

module.exports = router;
 