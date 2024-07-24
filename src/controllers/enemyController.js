// Import the model module
const enemyModel = require("../models/enemyModel.js");

// ================================================= CREATE ENEMY =================================================
module.exports.createNewEnemy = (req, res, next) => {
  // Checks if the required name field exists in the request body
  if (
    req.body.name == undefined ||
    req.body.power == undefined ||
    req.body.health == undefined
  ) {
    res.status(400).send("Error: Missing name or power or health information");
    return;
  }
  // Creates a new enemy entry using the insertSingle function from the enemy.js module
  const data = {
    name: req.body.name,
    power: req.body.power,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewEnemy:", error);
      res.status(500).json(error);
    } else {
      res.locals.id = results.insertId;
      next();
    }
  };

  enemyModel.insertSingle(data, callback);
};

// =========================================== READ ENEMY BY LOCALS ID ==============================================
module.exports.readEnemyByLocalsId = (req, res, next) => {
  // Extracts the Enemy ID from the request parameters and calls the selectById function from the EnemyModel.js module with the ID as an argument
  const data = {
    enemy_id: res.locals.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readEnemyByLocalsId:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Enemy not found",
        }); // If the Enemy is not found, it sends a 404 status code with a message indicating that the Enemy was not found
      } else res.status(201).json(results[0]); // If the Enemy is found, it returns their data as a JSON response with a 201 status code
    }
  };

  enemyModel.selectEnemyByLocalsId(data, callback);
};

// =================================================== READ ENEMY BY ID ================================================
module.exports.readEnemyById = (req, res, next) => {
  // Extracts the Enemy ID from the request parameters and calls the selectById function from the EnemyModel.js module with the ID as an argument
  const data = {
    enemy_id: req.params.enemy_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readEnemyById:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Enemy not found",
        }); // If the Enemy is not found, it sends a 404 status code with a message indicating that the enemy was not found
      } else {
        if (req.method == "PUT") {
          next();
        } else res.status(200).json(results[0]); // If the enemy is found, it returns their data as a JSON response with a 200 status code which means okay
      }
    }
  };

  enemyModel.selectById(data, callback);
};

// ========================================================== UPDATE ENEMY BY ID ================================================
module.exports.updateEnemyById = (req, res, next) => {
  // Checks if the title, description, points  field exist in the request body
  if (
    req.body.name == undefined ||
    req.body.power == undefined ||
    req.body.health == undefined
  ) {
    res.status(400).send("Error: Missing enemy or power or health field");
  }
  // Otherwise, it extracts the name,power and health from the requested parameters and body and calls the updateById function from the EnemyModel.js module to update the task's information
  const data = {
    name: req.body.name,
    power: req.body.power,
    health: req.body.health,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateEnemyById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          // If the Enemy is not found, it sends a 404 status code with a message indicating  that the task was not found.
          message: "Enemy not found",
        });
      } else {
        res.locals.id = data.enemy_id;
        next(); // If the Enemy is found and successfully updated, it calls the next middleware function
      }
    }
  };

  enemyModel.updateById(data, callback);
};

// ================================================= DELETE ENEMY BY ID ====================================
module.exports.deleteEnemyById = (req, res, next) => {
  // Extracts the Enemy from the request parameters and calls the deleteById function from the EnemyModel.js module.
  const data = {
    enemy_id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteEnemyById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "Enemy not found", // If the Enemy is not found, it sends a 404 status code with a message indicating that the user was not found
        });
      } else {
        let EnemyName = results[0].name;
        console.log(EnemyName);
        res.status(200).json({
          message: "Enemy succesfully deleted",
        }); // If Enemy is found and successfully deleted, it sends a 204 status code (No content)
      }
    }
  };

  enemyModel.deleteById(data, callback);
};

module.exports.readAllEnemies = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllEnemies:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  enemyModel.selectAll(callback);
};

module.exports.getEnemyCount = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getEnemyCount:", error);
      res.status(500).json(error);
    } else {
      const enemyCount = results[0].enemyCount;
      res.status(200).json({ message: "Number of Enemies:", enemyCount });
    }
  };
  enemyModel.getEnemyCount(callback);
};
