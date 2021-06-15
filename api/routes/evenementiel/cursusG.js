const express = require("express");
const router = express.Router();
const CursusG=require('../../controllers/evenementiel/cursusG')
const { checkToken } = require("../../auth/token_validation")


router.post("/", CursusG.createCursusG);
 
router.get("/:id",checkToken, CursusG.getCursusGById);

router.patch("/", checkToken, CursusG.updateCursusG);


module.exports = router;

 