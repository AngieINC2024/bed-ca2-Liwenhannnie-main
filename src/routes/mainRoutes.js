// Import the required modules:
// This code imports the Express module and creates a new router object.
const express = require("express");
const router = express.Router();

//Import the userRouters
const userRoutes = require("./userRoutes");

// Import the taskRouters
const taskRoutes = require("./taskRoutes");

// Import the taskProgressRouters
const taskProgressRoutes = require("./taskProgressRoutes");

// Import the fairyRouters
const fairyRoutes = require("./fairyRoute");

const fairyLevelRoutes = require("./fairyLevelRoutes.js");
// Import the arenaRoutes
const arenaRoutes = require("./arenaRoutes");

// Import the enemyRouters
const enemyRoutes = require("./enemyRoutes");

const attackRoutes = require("./attackRoutes");
const userController = require("../controllers/userController.js");
const jwtMiddleware = require("../middlewares/jwtMiddleware.js");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware.js");
const messageRoutes = require("./messageRoutes");
// Define the routes
router.post(
  "/login",
  userController.login,
  bcryptMiddleware.hashPassword,
  bcryptMiddleware.comparePassword,
  jwtMiddleware.generateToken,
  jwtMiddleware.sendToken
);
router.post(
  "/register",
  userController.checkUsernameOrEmailExist,
  bcryptMiddleware.hashPassword,
  userController.register,
  jwtMiddleware.generateToken,
  jwtMiddleware.sendToken
);
// This code set up the "/user" route and specifies that it should use the  userRoutes module for handling request
router.use("/users", userRoutes);

// This code set up the "/task" route and specifies that it should use the  taskRoutes module for handling request
router.use("/task", taskRoutes);

// This code set up the "/taskProgress" route and specifies that it should use the taskProgressRoutes module for handling request
router.use("/taskProgress", taskProgressRoutes);

// This code set up the "/fairy", routes and specifies that it should use the fairyRoutes module for handling request
router.use("/fairy", fairyRoutes);

router.use("/fairyLevel", fairyLevelRoutes);

// This code set up the "/arena", routes and specifies that it should use the arenaRoutes module for handling request
router.use("/arena", arenaRoutes);

// This code set up the "/enemy", routes and specifies that it should use the enemyRoutes module for handling request
router.use("/enemy", enemyRoutes);

router.use("/attack", attackRoutes);

router.use("/message", messageRoutes);
module.exports = router;
