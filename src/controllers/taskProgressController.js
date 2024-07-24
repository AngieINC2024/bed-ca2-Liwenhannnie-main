// Import the taskProgressModel module
const taskProgressModel = require("../models/taskProgressModel.js");

// ========================================= SECTION A Q11 POST TASK PROGRESS ==============================================
// ============================================= CREATE NEW TASK PROGRESS  =================================================
module.exports.createNewTaskProgress = (req, res, next) => {
  // Checks if the user_id or task_id or completion_date or notes is missing
  if (
    req.body.user_id == undefined ||
    req.body.task_id == undefined ||
    req.body.completion_date == undefined ||
    req.body.notes == undefined
  ) {
    res
      .status(400)
      .send(
        "Error: Missing user_id or task_id or completion_date or notes information"
      ); // If the required user_id or task_id field is missing, it sends a 400 status code with an error message.
    return;
  }
  // Creates a new taskProgress entry using the insertSingle function from the taskProgress.js module
  const data = {
    user_id: req.body.user_id,
    task_id: req.body.task_id,
    completion_date: req.body.completion_date,
    notes: req.body.notes,
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

  taskProgressModel.insertSingle(data, callback);
};

// ============================================ READ CREATED TASK PROGRESS BY LOCALS ID ===========================================
module.exports.readTaskProgressByLocalsId = (req, res, next) => {
  // Extracts the progress ID from the request parameters and calls the selectTaskProgressByLocalsId function from the taskProgressModel.js module with the ID as an argument
  const data = {
    progress_id: res.locals.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readTaskProgressByLocalsId:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Task Progress not found",
        }); // If the TaskProgress is not found, it sends a 404 status code with a message indicating that the Task Progress was not found
      } else {
        res.status(201).json(results[0]);
      }
      // If the TaskProgress is found, it returns their data as a JSON response with a 201 status code which means okay
    }
  };

  taskProgressModel.selectTaskProgressByLocalsId(data, callback);
};

module.exports.readAllTaskProgress = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllTaskProgress:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  taskProgressModel.selectAll(callback);
};
// ========================================= SECTION A Q12 GET TASK PROGRESS BY ID ==============================================
// ============================================= READ BY ID PARAMS ID ================================================
module.exports.readTaskProgressById = (req, res, next) => {
  // Extracts the progress ID from the request parameters and calls the selectById function from the taskProgressModel.js module with the ID as an argument
  const data = {
    progress_id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readTaskProgressById:", error);
      res.status(500).json(error); // Internal Server Error
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Task Progress not found",
        }); // If the TaskProgress is not found, it sends a 404 status code with a message indicating that the TaskProgress was not found
      } else {
        res.status(200).json(results[0]);
      } // If the TaskProgress is found, it returns their data as a JSON response with a 200 status code which means okay
    }
  };

  taskProgressModel.selectById(data, callback);
};

// ===================================== SECTION A Q13 UPDATE TASK PROGRESS BY ID ========================================
// =============================================== UPDATE BY ID =========================================================
module.exports.updateTaskProgressById = (req, res, next) => {
  // Checks if the notes are undefined
  if (req.body.notes == undefined) {
    // If notes is missing, it sends a 400 status request body
    res.status(400).json({
      message: "Error: Missing notes fieldd",
    });
    return;
  }

  // Otherwise, it extracts the progress_id and notes from the requested parameters and body and calls the updateById function from the taskProgressModel.js module to update the task's Progress information
  const data = {
    progress_id: req.params.id,
    notes: req.body.notes,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateTaskProgressById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          // If the Task Progress is not found, it sends a 404 status code with a message indicating that the taskProgress was not found.
          message: "Task Progress not found",
        });
      } else {
        // Set the locally scoped 'id' variable to the last inserted ID from the database results
        res.locals.id = data.progress_id;
        next();
      }
    }
  };

  taskProgressModel.updateById(data, callback);
};

// ======================================= SECTION A Q14 DELETE FAIRY BY ID ============================================
// =========================================== DELETE TASK PROGRESS BY ID =================================================
module.exports.deleteTaskProgressById = (req, res, next) => {
  // Extracts the progress_id from the request parameters and calls the deleteById function from the taskProgressModel.js module.
  const data = {
    progress_id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteTaskProgressById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "TaskProgress not found", // If the TaskProgress is not found, it sends a 404 status code with a message indicating that the taskProgress was not found
        });
      } else res.status(204).send(); // If TaskProgress is found and successfully deleted, it sends a 204 status code (No content)
    }
  };

  taskProgressModel.deleteById(data, callback);
};
