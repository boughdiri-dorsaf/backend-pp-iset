const express = require("express");
const router = express.Router();
const domaineController=require('../../controllers/evenementiel/domaine')


router.post("/", domaineController.createDomaine);

router.get("/", domaineController.getListDomaine);

router.get("/:id", domaineController.getDomaineById);

router.patch("/", domaineController.updateDomaine);

router.delete("/:id", domaineController.deleteDomaine);

module.exports = router;
 