// Import the taskProgressModel module

const fairyLevelModel = require("../models/fairyLevelModel.js");

// ============================================= CHECKS FAIRY LEVEL BY LEVEL NAME ======================================
module.exports.checkIfEnoughPoints = (req, res, next) => {
  // Extracts the level_name from the request parameters and calls the selectById function from the fairyLevelModule.js module with the ID as an argument
  if (req.body.level_name == undefined) {
    // If any of them are missing, it sends a 400 status request body
    res.status(400).json({
      message: "Error: Level_name is not provided",
    });
    return;
  }

  const data = {
    fairy_id: req.body.fairy_id,
    level_name: req.body.level_name,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkIfEnoughPoints:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Fairy Level not found",
        }); // If the Fairy Level  is not found, it sends a 404 status code with a message indicating that the Player was not found
      } else {
        if (results[0][0].points > results[1][0].level_points) {
          next();
        } else {
          res.status(409).json({
            Message: "Not Enough Points",
            Current_Fairy_Points: results[0][0].points,
            Require_Points: results[1][0].level_points,
          });
        }
      }
    }
  };

  fairyLevelModel.selectById(data, callback);
};

module.exports.checkIfLowerLevel = (req, res, next) => {
  // Extracts the level_name from the request parameters and calls the selectById function from the fairyLevelModule.js module with the ID as an argument
  const data = {
    level_name: req.body.level_name,
    fairy_id: req.body.fairy_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkIfEnoughPoints:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Fairy Level not found",
        }); // If the Fairy Level  is not found, it sends a 404 status code with a message indicating that the Player was not found
      } else {
        if (results[0][0].level_id < results[1][0].level_id) {
          res.status(409).json({
            message: "Unable to upgrade to a lower level",
          });
        } else {
          next();
        }
      }
    }
  };

  fairyLevelModel.checkFairyLevel(data, callback);
};

module.exports.readAllFairylevels = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllFairylevels:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  fairyLevelModel.selectAll(callback);
};
