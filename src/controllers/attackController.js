const attackModel = require("../models/attackModel");

module.exports.readAllAttacks = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllAttacks:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  attackModel.selectAll(callback);
};

module.exports.readAttacksByFairyId = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAttacksByFairyId:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };

  if (req.params.fairy_id == undefined) {
    var data = {
      enemy_id: req.params.enemy_id,
    };
    attackModel.selectAttackByEnemyId(data, callback);
  } else {
    var data = {
      fairy_id: req.params.fairy_id,
    };
    attackModel.selectAttackByFairyId(data, callback);
  }
};
