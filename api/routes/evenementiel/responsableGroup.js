const express = require("express");
const router = express.Router();
const responsableGroupController=require('../../controllers/evenementiel/responsableGroup')


router.post("/", responsableGroupController.create);

router.get("/", responsableGroupController.getListResponsableGroup);

router.get("/:id", responsableGroupController.getResponsableGroupById);

router.patch("/", responsableGroupController.update);

router.delete("/:id", responsableGroupController.deleteResponsableGroup);

module.exports = router;
