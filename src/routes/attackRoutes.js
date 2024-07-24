// Import the require modules and create a router object:
const express = require("express");
const router = express.Router();

// Import the userController module:
const attackController = require("../controllers/attackController");

router.get("/", attackController.readAllAttacks);

module.exports = router;
