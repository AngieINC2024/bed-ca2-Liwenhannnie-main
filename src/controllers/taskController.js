// Import the model module
const taskModel = require("../models/taskModel.js");

// ========================================= SECTION A Q6 POST TASK ==============================================
// ============================================= CREATE NEW TASK =================================================
module.exports.createNewTask = (req, res, next) => {
  // Checks if the required name field exists in the request body
  if (
    req.body.title == undefined ||
    req.body.description == undefined ||
    req.body.points == undefined
  ) {
    res.status(400).send("Error: Missing title, description, points"); // If the required usernane or email field is missing, it sends a 400 status code with an error message.
    return;
  }
  // Creates a new Task entry using the insertSingle function from the taskModel.js module and returns the result as a JSON response with 201 status code
  const data = {
    title: req.body.title,
    description: req.body.description,
    points: req.body.points,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewTask:", error);
      res.status(500).json(error);
    } else {
      res.locals.id = results.insertId;
      next();
    }
  };

  taskModel.insertSingle(data, callback);
};

// ============================================= READ CREATED TASK BY LOCALS ID ===================================
module.exports.readTaskByLocalsId = (req, res, next) => {
  // Extracts the progress ID from the request parameters and calls the selectById function from the PlayerModel.js module with the ID as an argument
  const data = {
    task_id: res.locals.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readTaskByLocalsId:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Task not found",
        }); // If the Task is not found, it sends a 404 status code with a message indicating that the Player was not found
      } else res.status(201).json(results[0]); // If the Task is found, it returns their data as a JSON response with a 200 status code which means okay
    }
  };

  taskModel.selectTaskByLocalsId(data, callback);
};

// ====================================== SECTION A Q7 GET ALL TASKS ================================================
// ========================================== SELECT ALL TASKS =====================================================
module.exports.readAllTask = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllTask:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  taskModel.selectAll(callback);
};

// ====================================== SECTION A Q8 GET TASKS BY ID ================================================
// ========================================== SELECT TASK BY ID  =====================================================

module.exports.readTaskById = (req, res, next) => {
  // Extracts the task ID from the request parameters and calls the selectById function from the taskModel.js module with the ID as an argument
  const data = {
    task_id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readTaskById:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        // next(); // calls the next middleware
      } else res.status(200).json(results[0]); // If the task is found, it returns their data as a JSON response with a 200 status code which means okay
    }
  };

  taskModel.selectById(data, callback);
};

// ====================================== SECTION A Q9 UPDATE TASK BY ID ================================================
// ========================================== UPDATE TASK BY ID  =====================================================
module.exports.updateTaskById = (req, res, next) => {
  // Checks if the title, description, points  field exist in the request body
  if (
    req.body.title == undefined ||
    req.body.description == undefined ||
    req.body.points == undefined
  ) {
    // If any of them are missing, it sends a 400 status request body
    res.status(400).json({
      message: "Error: title or description or email is undefined",
    });
    return;
  }
  // Otherwise, it extracts the ID,title, description and points from the requested parameters and body and calls  the updateById function from the taskModel.js module to update the task's information
  const data = {
    task_id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    points: req.body.points,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateTaskById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          // If the Task is not found, it sends a 404 status code with a message indicating  that the task was not found.
          message: "Task not found",
        });
      } else {
        res.locals.id = data.task_id;
        next();
      }
      // If the Task is found and successfully updated, it sends a 200 status code
    }
  };

  taskModel.updateById(data, callback);
};

// ====================================== SECTION A Q10 DELETE TASK BY ID ================================================
// ========================================== DELETE TASK BY ID  =====================================================
module.exports.deleteTaskById = (req, res, next) => {
  // Extracts the task_iD from the request parameters and calls the deleteById function from the taskModel.js module.
  const data = {
    task_id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteTaskById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "Task not found", // If the Task is not found, it sends a 404 status code with a message indicating that the task was not found
        });
      } else res.status(204).send(); // If Task is found and successfully deleted, it sends a 204 status code (No content)
    }
  };

  taskModel.deleteById(data, callback);
};
