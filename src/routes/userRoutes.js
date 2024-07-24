// Import the require modules and create a router object:
const express = require("express");
const router = express.Router();

// Import the userController module:
const controller = require("../controllers/userController");

router.post("/", controller.createNewUser, controller.readUserByLocalsId);
router.get("/", controller.readAllUser);
router.get("/count", controller.getUserCount);
router.get("/:id", controller.readUserInfoById);
router.put(
  "/:id",
  controller.checkUsername,
  controller.checkEmail,
  controller.updateUserById,
  controller.readUserByLocalsId
);
router.delete("/:id", controller.deleteUserById);

// Export the router object
module.exports = router;
