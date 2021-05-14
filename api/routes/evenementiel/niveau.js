const express = require("express");
const router = express.Router();
const niveauController=require('../../controllers/evenementiel/niveau')


router.post("/", niveauController.createNiveau);

router.get("/", niveauController.getListNiveau);

router.get("/:id", niveauController.getNiveauById);

router.patch("/", niveauController.updateNiveau);

router.delete("/:id", niveauController.deleteNiveau);

module.exports = router;
 