const pool = require("../services/db");

module.exports.checkAttackByType = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT attack_by FROM Attack
    WHERE attack = ?
    `;

  const VALUES = [data.attack];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.attackEnemy = (data, callback) => {
  // SQL Statement to update the fairy's level and other attributes based on the new level
  const SQLSTATEMENT = `
  UPDATE Enemy
  SET Health = Health - (SELECT damage FROM Attack WHERE attack = ?)
  WHERE Enemy.enemy_name = ?;
       `;

  // Declare values for the SQL query
  const VALUES = [data.attack, data.enemy_name];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.attackFairy = (data, callback) => {
  // SQL Statement to update the fairy's level and other attributes based on the new level
  const SQLSTATEMENT = `
    UPDATE Fairy
    SET Health = Health - (SELECT damage FROM Attack WHERE attack = ?)
    WHERE Fairy.fairy_name = ?;
         `;

  // Declare values for the SQL query
  const VALUES = [data.attack, data.fairy_name];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectHealth = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT health FROM Fairy
      WHERE fairy_name = ?
      UNION ALL
      SELECT health FROM Enemy
      WHERE enemy_name = ?;
      `;

  const VALUES = [data.fairy_name, data.enemy_name];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.checkWhichPointsToAdd = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT health
  FROM Enemy
  WHERE enemy_name = ?`;

  const VALUES = [data.enemy_name];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.addEnemyDefeatedPoints = (data, callback) => {
  const SQLSTATEMENT = `
  UPDATE Fairy
  SET points = points + (SELECT points FROM Task WHERE title = 6) + (SELECT points FROM Task WHERE id = 7)
  WHERE Fairy.fairy_name = ?`;

  const VALUES = [data.fairy_name];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.addEnemyPowerPoints = (data, callback) => {
  const SQLSTATEMENT = `
  UPDATE Fairy
  SET points = points + (SELECT points FROM Task WHERE id = 6)
  WHERE Fairy.fairy_name = ?`;

  const VALUES = [data.fairy_name];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
