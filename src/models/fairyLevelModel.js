// Importing the database connection pool module
const pool = require("../services/db");

// ======================================== SELECT BY ID=========================

module.exports.selectById = (data, callback) => {
  // SQL statement to select all records from the "Fairy_Level" table where Level_name matches the provided parameters
  const SQLSTATEMENT = `
      SELECT points 
      From Fairy
      WHERE fairy_id = ?;

      SELECT level_points
      FROM Fairy_level
      WHERE level_name =?
      `;

  const VALUES = [data.fairy_id, data.level_name];
  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectLevelIdById = (data, callback) => {
  // SQL statement to select all records from the "Fairy_Level" table where Level_name matches the provided parameters
  const SQLSTATEMENT = `
      SELECT level
      From Fairy
      WHERE fairy_id = ?;

      SELECT level_id
      FROM Fairy_level
      WHERE level_name =?
      `;

  const VALUES = [data.fairy_id, data.level_name];
  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.checkFairyLevel = (data, callback) => {
  // SQL statement to select all records from the "Fairy_Level" table where Level_name matches the provided parameters
  const SQLSTATEMENT = `
      SELECT level_id
      FROM Fairy_level
      WHERE level_name = ?;

      SELECT level_id
      FROM Fairy_level
      INNER JOIN Fairy ON Fairy.level = Fairy_level.level_name
      WHERE Fairy.fairy_id = ?
      `;

  const VALUES = [data.level_name, data.fairy_id];
  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, VALUES, callback);
};


module.exports.selectAll = (callback) => {
  // SQL statement to select all records from the "Task" table
  const SQLSTATEMENT = `
      SELECT * 
      FROM Fairy_Level;
      `;

  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, callback);
};