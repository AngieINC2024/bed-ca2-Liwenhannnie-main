// Import the require modules and create a router object:
const express = require("express");
const router = express.Router();

// Import the userController module:
const fairyController = require("../controllers/fairyController");
const fairyLevelController = require("../controllers/fairyLevelController");
const attackController = require("../controllers/attackController");
router.post(
  "/",
  fairyController.createNewFairy,
  fairyController.readFairyByLocalsId
);

router.get("/", fairyController.readAllFairies);
router.get("/count", fairyController.getFairyCount);
router.get("/:fairy_id", fairyController.readFairyById);
router.get("/:fairy_id/attack", attackController.readAttacksByFairyId);

router.put(
  "/",
  fairyController.readFairyById,
  fairyController.checkIfLevelIsTheSame,
  fairyLevelController.checkIfLowerLevel,
  fairyLevelController.checkIfEnoughPoints,
  fairyController.UpgradeFairy,
  fairyController.readFairyByLocalsId
);

router.put(
  "/:id",
  fairyController.updateFairyById,
  fairyController.readFairyByLocalsId
);

router.delete("/:id", fairyController.deleteFairyById);

module.exports = router;
