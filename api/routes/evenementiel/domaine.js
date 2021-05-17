const express = require("express");
const router = express.Router();
const domaineController=require('../../controllers/evenementiel/domaine')

const { checkToken } = require("../../auth/token_validation")

router.post("/", checkToken, domaineController.createDomaine);

router.get("/", checkToken, domaineController.getListDomaine);

router.get("/:id", checkToken, domaineController.getDomaineById);

router.patch("/", checkToken, domaineController.updateDomaine);

router.delete("/:id", checkToken, domaineController.deleteDomaine);

module.exports = router;
 