const pool = require("../services/db");

module.exports.selectAll = (callback) => {
  // SQL statement to select all records from the "Task" table
  const SQLSTATEMENT = `
        SELECT * 
        FROM Attack;
        `;

  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, callback);
};

module.exports.selectAttackByFairyId = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT Fairy.fairy_name, Attack.*
    FROM Fairy
    INNER JOIN Attack ON Fairy.power = Attack.attack_type
    WHERE Fairy.fairy_id = ?;
  `;
  const VALUES = [data.fairy_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectAttackByEnemyId = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT Enemy.enemy_name, Attack.*
    FROM Enemy
    INNER JOIN Attack ON Enemy.power = Attack.attack_type
    WHERE Enemy.enemy_id = ?;
  `;
  const VALUES = [data.enemy_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};
