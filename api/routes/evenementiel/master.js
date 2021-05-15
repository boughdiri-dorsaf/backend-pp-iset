const express = require("express");
const router = express.Router();
const masterController=require('../../controllers/evenementiel/master')


router.post("/", masterController.createMaster);

router.get("/", masterController.getListMaster);

router.get("/:id", masterController.getMasterById);

router.patch("/", masterController.updateMaster);

router.delete("/:id", masterController.deleteSpecialite);

module.exports = router;
