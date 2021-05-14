const express = require("express");
const router = express.Router();
const classeController=require('../../controllers/evenementiel/classe')


router.post("/", classeController.createClasse);

router.get("/", classeController.getListClasse);

router.get("/:id", classeController.getClasseById);

router.patch("/", classeController.updateClasse);

router.delete("/:id", classeController.deleteClasse);

module.exports = router;
 