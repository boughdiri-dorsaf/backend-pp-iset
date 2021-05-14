const express = require("express");
const router = express.Router();
const departementController=require('../../controllers/evenementiel/departement')


router.post("/", departementController.createDepartement);

router.get("/", departementController.getListDepartement);

router.get("/:id", departementController.getDepartementById);

router.patch("/", departementController.updateDepartement);

router.delete("/:id", departementController.deleteDepartement);

module.exports = router;
