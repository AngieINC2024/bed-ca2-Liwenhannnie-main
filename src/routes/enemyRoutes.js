// Import the require modules and create a router object:
const express = require("express");
const router = express.Router();

// Import the userController module:
const enemyController = require("../controllers/enemyController");
const attackController = require("../controllers/attackController");

router.post(
  "/",
  enemyController.createNewEnemy,
  enemyController.readEnemyByLocalsId
);

router.get("/", enemyController.readAllEnemies);
router.get("/count", enemyController.getEnemyCount);
router.get("/:enemy_id", enemyController.readEnemyById);
router.get("/:enemy_id/attack", attackController.readAttacksByFairyId);

// Export the router object
module.exports = router;
