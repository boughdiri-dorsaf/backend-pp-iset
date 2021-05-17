const express = require("express");
const router = express.Router();
const etudiantController=require('../../controllers/evenementiel/etudiant')

const { checkToken } = require("../../auth/token_validation")

router.post("/", checkToken, etudiantController.createEtudiant);

router.get("/", checkToken, etudiantController.getListEtudiant);

router.get("/:id", checkToken, etudiantController.getEtudiantById);

router.patch("/", checkToken, etudiantController.updateEtudiant);


module.exports = router;
