const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");

const wikiController = require("../controllers/wikiController");

//router.get("/wikis/wiki", wikiController.index); not needed - keep in case issues down the road


router.get("/wikis/", wikiController.index);
router.get("/wikis/new", wikiController.new);
router.post("/wikis/create", helper.ensureAuthenticated, wikiController.create);
router.get('/wikis/private', wikiController.private);

// order matters, esp with wildcard routes!!!

router.get("/wikis/:id", wikiController.show);
router.get("/wikis/:id/edit", wikiController.edit);
router.post("/wikis/:id/update", wikiController.update);
router.post("/wikis/:id/destroy", wikiController.destroy);


module.exports = router;