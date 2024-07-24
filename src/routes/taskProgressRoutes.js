// Import the require modules and create a router object:
const express = require("express");
const router = express.Router();

// Import the userController module:
const taskProgressController = require("../controllers/taskProgressController");

router.post(
  "/",
  taskProgressController.createNewTaskProgress,
  taskProgressController.readTaskProgressByLocalsId
);
router.get("/:id", taskProgressController.readTaskProgressById);
router.put(
  "/:id",
  taskProgressController.updateTaskProgressById,
  taskProgressController.readTaskProgressByLocalsId
);

router.delete("/:id", taskProgressController.deleteTaskProgressById);
// Export the router object
module.exports = router;
