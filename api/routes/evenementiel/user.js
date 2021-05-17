 const express = require("express");
const router = express.Router();
const userController=require('../../controllers/evenementiel/user')
const { checkToken } = require("../../auth/token_validation")


router.post("/login", userController.getUserByUserEmail);

router.post("/", userController.create);

router.get("/", checkToken, userController.getUsers);

router.get("/:id", checkToken, userController.getUserByUserId);

router.patch("/", checkToken, userController.updateUser);

router.patch("/forgotPassword", userController.forgotPassword);

router.patch("/resetPassword", userController.resetPassword);


module.exports = router;

  
   