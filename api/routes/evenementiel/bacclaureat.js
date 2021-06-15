const express = require("express");
const router = express.Router();
const BacController=require('../../controllers/evenementiel/bacclaureat')
const { checkToken } = require("../../auth/token_validation")


router.post("/", BacController.createBacclaureat);
 
router.get("/:id",checkToken, BacController.getBacById);

router.patch("/", checkToken, BacController.updateBacclaureat);


module.exports = router;

 