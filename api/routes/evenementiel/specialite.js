const express = require("express");
const router = express.Router();
const specialiteController=require('../../controllers/evenementiel/specialite')


router.post("/", specialiteController.createSpecialite);

router.get("/", specialiteController.getListSpecialite);

router.get("/:id", specialiteController.getSpecialiteById);

router.patch("/", specialiteController.updateSpecialite);

router.delete("/:id", specialiteController.deleteSpecialite);

module.exports = router;
