// Import the require modules and create a router object:
const express = require("express");
const router = express.Router();

// Import the userController module:
const arenaController = require("../controllers/arenaController");

router.put(
  "/",
  arenaController.checkAttackBy,
  arenaController.CheckHealth,
  arenaController.attackEnemy,
  arenaController.addPoints,
  arenaController.displayHealth
);

// Export the router object
module.exports = router;
