const express = require("express");
const router = express.Router();
const etudiantController=require('../../controllers/evenementiel/etudiant')


router.post("/", etudiantController.createEtudiant);

router.get("/", etudiantController.getListEtudiant);

router.get("/:id", etudiantController.getEtudiantById);

router.patch("/", etudiantController.updateEtudiant);


module.exports = router;
