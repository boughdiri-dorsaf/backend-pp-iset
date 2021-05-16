const express = require("express");
const router = express.Router();
const etatController=require('../../controllers/evenementiel/etatDemandeMaster')


router.post("/", etatController.creatEtat);

router.get("/", etatController.getListEtat);

router.get("/:id", etatController.getEtatById);

router.patch("/", etatController.updateEtat);

router.delete("/:id", etatController.deleteEtat);

module.exports = router;
 