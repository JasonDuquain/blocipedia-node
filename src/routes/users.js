const express = require("express");
const router = express.Router();
const validation = require("./validation");

const userController = require("../controllers/userController");


router.get("/users/signup", userController.signup); 
router.post("/users/signup", validation.validateUsers, userController.create);

router.get("/users/sign_in", userController.signInForm);
router.post("/users/sign_in", validation.validateUsers, userController.signIn);
router.get("/users/sign_out", userController.signOut);

// ** make sure any /users/anything/anything go BELOW the wildcard routes **
router.get('/users/account', userController.show);
router.get('/users/upgrade', userController.upgradeForm);
router.post('/users/:id/upgrade', userController.upgrade);
router.get('/users/upgrade-success', userController.upgraded);
router.post('/users/:id/downgrade', userController.downgrade);





module.exports = router;










