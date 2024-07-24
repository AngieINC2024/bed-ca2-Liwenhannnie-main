// Import the require modules and create a router object:
const express = require("express");
const router = express.Router();

// Import the userController module:
const controller = require("../controllers/taskController");

router.post("/", controller.createNewTask, controller.readTaskByLocalsId);
router.get("/", controller.readAllTask);
router.get("/:id", controller.readTaskById);
router.put("/:id", controller.updateTaskById, controller.readTaskByLocalsId);
router.delete("/:id", controller.deleteTaskById);

// Export the router object
module.exports = router;
