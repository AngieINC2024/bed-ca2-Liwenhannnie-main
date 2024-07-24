// Import the FairyModel module
const FairyModel = require("../models/fairyModel.js");

// ==================================== CREATE NEW FAIRY =========================================================
module.exports.createNewFairy = (req, res, next) => {
  // Checks if the required name field exists in the request body
  if (req.body.name == undefined || req.body.power == undefined) {
    res.status(400).send("Error: Missing name or power information"); // If the required usernane or email field is missing, it sends a 400 status code with an error message.
    return;
  }
  // Creates a new fairyProgress entry using the insertSingle function from the fairyProgress.js module and returns the result as a JSON response with 201 status code
  const data = {
    name: req.body.name,
    power: req.body.power,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewFairy:", error);
      res.status(500).json(error);
    } else {
      res.locals.id = results.insertId;
      next();
    }
  };

  FairyModel.insertSingle(data, callback);
};

// =================================================== READ ALL FAIRES ============================================================

module.exports.readAllFairies = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllFairies:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  FairyModel.selectAll(callback);
};

module.exports.readFairyByLocalsId = (req, res, next) => {
  // Extracts the fairy ID from the request parameters and calls the selectById function from the FairyModel.js module with the ID as an argument
  const data = {
    fairy_id: res.locals.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readFairyByLocalsId:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Fairy not found",
        }); // If the Fairy is not found, it sends a 404 status code with a message indicating that the Fairy was not found
      } else res.status(201).json(results[0]); // If the Fairy is found, it returns their data as a JSON response with a 200 status code which means okay
    }
  };

  FairyModel.selectFairyByLocalsId(data, callback);
};

module.exports.readFairyById = (req, res, next) => {
  // Extracts the Fairy ID from the request parameters and calls the selectById function from the FairyModel.js module with the ID as an argument
  if (req.params.fairy_id == undefined) {
    var data = {
      fairy_id: req.body.fairy_id,
    };
  } else {
    var data = {
      fairy_id: req.params.fairy_id,
    };
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readFairyById:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Fairy not found",
        }); // If the Fairy is not found, it sends a 404 status code with a message indicating that the fairy was not found
      } else {
        if (req.method == "PUT") {
          next(); // If the `next` function is provided, call it to proceed to the next middleware
        } else {
          res.status(200).json(results[0]);
        } // If the fairy is found, it returns their data as a JSON response with a 200 status code which means okay
      }
    }
  };

  FairyModel.selectById(data, callback);
};

// =============================== SECTION A Q13 UPDATE TASK PROGRESS BY ID ================================================
// ============================================ UPDATE BY ID ==========================================================
module.exports.updateFairyById = (req, res, next) => {
  // Checks if the title, description  field exist in the request body
  if (req.body.fairy_name == undefined || req.body.power == undefined) {
    res.status(400).send("Error: Missing name or power field");
  }
  // Otherwise, it extracts the fairy_id, name, power, health, level and  from the requested parameters and body and calls the updateById function from the fairyController.js module to update the fairy's information
  const data = {
    fairy_id: req.params.id,
    fairy_name: req.body.fairy_name,
    power: req.body.power,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateFairyById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          // If the Fairy is not found, it sends a 404 status code with a message indicating  that the task was not found.
          message: "Fairy not found",
        });
      } else {
        res.locals.id = data.fairy_id;
        next(); // If the Fairy is found and successfully updated, it calls the next middleware function
      }
    }
  };

  FairyModel.updateById(data, callback);
};

// ============================================= DELETE FAIRY ==============================================
module.exports.deleteFairyById = (req, res, next) => {
  // Extracts the Fairy from the request parameters and calls the deleteById function from the FairyModel.js module.
  const data = {
    fairy_id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteFairyById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "Fairy not found", // If the User is not found, it sends a 404 status code with a message indicating that the user was not found
        });
      } else {
        res.status(200).json({
          message: "Fairy succesfully deleted",
        }); // If User is found and successfully deleted, it sends a 204 status code (No content)
      }
    }
  };

  FairyModel.deleteById(data, callback);
};

// ======================================= UPGRADE FAIRY ====================================
module.exports.UpgradeFairy = (req, res, next) => {
  const data = {
    fairy_id: req.body.fairy_id,
    level_name: req.body.level_name,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error UpgradeFairy", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "Fairy not found, cannot be upgraded",
        });
      } else {
        res.locals.id = data.fairy_id;
        next();
      }
    }
  };

  FairyModel.upgradeFairyById(data, callback);
};

module.exports.checkIfLevelIsTheSame = (req, res, next) => {
  const data = {
    fairy_id: req.body.fairy_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error UpgradeFairy", error);
      res.status(500).json(error);
    } else {
      if (results[0].level == req.body.level_name) {
        res.status(409).json({
          Message: "Fairy already has this rank.",
        });
      } else {
        next();
      }
    }
  };
  FairyModel.selectLevelByRequest(data, callback);
};

module.exports.getFairyCount = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getFairyCount:", error);
      res.status(500).json(error);
    } else {
      const fairyCount = results[0].fairyCount;
      res.status(200).json({ message: "Number of Fairy:", fairyCount });
    }
  };
  FairyModel.getFairyCount(callback);
};
