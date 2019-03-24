const express = require("express");
const router = express.Router();
const validation = require("./validation");

const userController = require("../controllers/userController");


// router.post("/users/signup", userController.signup); - removing this as it was for the intial test but not needed anymore?

router.get("/users/signup", userController.signup); //need a get route for the initial functionality test??

router.post("/users/signup", validation.validateUsers, userController.create);


module.exports = router;