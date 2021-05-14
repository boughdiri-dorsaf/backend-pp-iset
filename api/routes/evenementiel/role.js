const express = require("express");
const router = express.Router();
const roleController=require('../../controllers/evenementiel/role')


router.post("/", roleController.createRole);

router.get("/", roleController.getListRole);

router.get("/:id", roleController.getRoleById);

router.patch("/", roleController.updateRole);

router.delete("/:id", roleController.deleteRole);

module.exports = router;
 