// Import the require modules and create a router object:
const express = require("express");
const router = express.Router();

// Import the userController module:
const fairyLevelController = require("../controllers/fairyLevelController");

router.get("/", fairyLevelController.readAllFairylevels);

module.exports = router;
