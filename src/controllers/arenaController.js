// Import the model module
const ArenaModel = require("../models/arenaModel.js");
const enemyModel = require("../models/enemyModel.js");
const fairyModel = require("../models/fairyModel.js");
// ============================================= CHECKS ATTACK BY ===============================================
module.exports.checkAttackBy = (req, res, next) => {
  const data = {
    attack: req.body.attack,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readUserInfoById:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Attack By not found",
        });
      } else {
        res.locals.attackBy = results[0].attack_by;
        next();
      }
    }
  };
  ArenaModel.checkAttackByType(data, callback);
};

// ================================================= ATTACK ENEMY ===================================================
module.exports.attackEnemy = (req, res, next) => {
  if (
    req.body.fairy_name == undefined ||
    req.body.enemy_name == undefined ||
    req.body.attack == undefined
  ) {
    res
      .status(400)
      .send("Error: Missing fairy_name or enemy_name or attack_type field");
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error attackEnemy:", error);
      return res.status(500).json(error);
    } else {
      next();
    }
  };
  if (res.locals.healthLeftMoreThanZero == false) {
    if (res.locals.attackBy == "Fairy") {
      const data = {
        enemy_name: req.body.enemy_name,
        fairy_name: req.body.enemy_name,
        attack: req.body.attack,
      };
      enemyModel.updateDefeatedEnemy(data, callback);
    } else if (res.locals.attackBy == "Enemy") {
      const data = {
        fairy_name: req.body.fairy_name,
      };
      fairyModel.updateDefeatedFairy(data, callback);
    }
  } else if (res.locals.healthLeftMoreThanZero == true) {
    if (res.locals.attackBy == "Fairy") {
      const data = {
        enemy_name: req.body.enemy_name,
        attack: req.body.attack,
      };
      ArenaModel.attackEnemy(data, callback);
    } else if (res.locals.attackBy == "Enemy") {
      const data = {
        fairy_name: req.body.fairy_name,
        attack: req.body.attack,
      };
      ArenaModel.attackFairy(data, callback);
    }
  }
};
// ================================================ DISPLAY HEALTH =========================================
module.exports.displayHealth = (req, res, next) => {
  const data = {
    fairy_name: req.body.fairy_name,
    enemy_name: req.body.enemy_name,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error displayHealth:", error);
      return res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        return res.status(404).json({
          message: "Information not found",
        });
      } else {
        res.status(201).json({
          fairy_name: data.fairy_name,
          fairy_health: results[0],
          enemy_name: data.enemy_name,
          enemy_health: results[1],
        });
      }
    }
  };

  ArenaModel.selectHealth(data, callback);
};

// ========================================= CHECK IF ENOUGH HEALTH =========================================
module.exports.CheckHealth = (req, res, next) => {
  if (
    req.body.fairy_name == undefined ||
    req.body.enemy_name == undefined ||
    req.body.attack == undefined
  ) {
    res
      .status(400)
      .send("Error: Missing fairy_name or enemy_name or attack_type field");
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateEnemyById:", error);
      return res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        return res.status(404).json({
          // If the Attack is not found, it sends a 404 status code with a message indicating that the Attack was not found.
          message: "Attack not found",
        });
      } else {
        if (results[0][0].health - results[1][0].damage <= 0) {
          res.locals.healthLeftMoreThanZero = false;
          next();
        } else if (results[0][0].health - results[1][0].damage > 0) {
          res.locals.healthLeftMoreThanZero = true;
          next();
          // Calls a model to set the health automatically to 0. Enemy/fairy has died;
        }
      }
    }
  };

  if (res.locals.attackBy == "Fairy") {
    const data = {
      enemy_name: req.body.enemy_name,
      attack: req.body.attack,
    };
    enemyModel.selectEnemyHealthAndAttack(data, callback);
  } else if (res.locals.attackBy == "Enemy") {
    const data = {
      fairy_name: req.body.fairy_name,
      attack: req.body.attack,
    };
    fairyModel.selectFairyHealthAndAttack(data, callback);
  }
};

module.exports.addPoints = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error addPoints:", error);
      return res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        return res.status(404).json({
          // If the Attack is not found, it sends a 404 status code with a message indicating that the Attack was not found.
          message: "Task not found",
        });
      } else {
        if (results[0].health == 0) {
          var callback2 = (error, results, fields) => {
            if (error) {
              console.error("Error addPoints:", error);
              return res.status(500).json(error);
            } else {
              if (results.affectedRows == 0) {
                return res.status(404).json({
                  message: "Unable to add points",
                });
              } else {
                next();
              }
            }
          };
          const data = {
            fairy_name: req.body.fairy_name,
          };
          ArenaModel.addEnemyDefeatedPoints(data, callback2);
        } else {
          const data = {
            fairy_name: req.body.fairy_name,
          };
          ArenaModel.addEnemyPowerPoints(data, callback2);
          // Calls a model to set the health automatically to 0. Enemy/fairy has died;
        }
      }
    }
  };

  if ((res.locals.attackBy = "Fairy")) {
    const data = {
      enemy_name: req.body.enemy_name,
    };
    ArenaModel.checkWhichPointsToAdd(data, callback);
  } else {
    next();
  }
};
