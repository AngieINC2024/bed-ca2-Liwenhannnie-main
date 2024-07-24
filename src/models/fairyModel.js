// Importing the database connection pool module
const pool = require("../services/db");

// ========================================== INSERT SINGLE =============================================
module.exports.insertSingle = (data, callback) => {
  // Insert INTO statment add new records to a fairy, at the same time specifying the columns name, power health, level that the values will be provided
  const SQLSTATEMENT = `
          INSERT INTO Fairy (fairy_name, power, health, level, points )
          VALUES ( ?, ?, '100', 'Winx', 0);
          `;
  //declare values to [data.name, data.power, data.health, data.level] which is the name, power, health, level and points
  const VALUES = [data.name, data.power];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

//================================================ SELECY ALL FAIRIES =================================================
module.exports.selectAll = (callback) => {
  // SQL statement to select all records from the "Task" table
  const SQLSTATEMENT = `
      SELECT * 
      FROM Fairy;
      `;

  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, callback);
};

// ================================================= SELECT FAIRY BY LOCALS ID ========================================

module.exports.selectFairyByLocalsId = (data, callback) => {
  // SQL Statement to select all columns from the Fairy table where the ID matches the provided parameter
  const SQLSTATEMENT = `
        SELECT *
        FROM Fairy
        WHERE fairy_id = ?;
        `;
  //declare values to [data.fairy_id] which is the fairy_id of the fairy
  const VALUES = [data.fairy_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ================================================= SELECT FAIRY BY ID ========================================

module.exports.selectById = (data, callback) => {
  // SQL Statement to select all columns from the Fairy table where the ID matches the provided parameter
  const SQLSTATEMENT = `
        SELECT *
        FROM Fairy
        WHERE fairy_id = ?;
        `;
  //declare values to [data.fairy_id] which is the fairy_id of the fairy
  const VALUES = [data.fairy_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ======================================= UPDATE BY ID ===========================================
module.exports.updateById = (data, callback) => {
  // UPDATE query to modify the 'name', 'power', 'health', 'level' and columns in the 'Fairy' table
  const SQLSTATEMENT = `
    UPDATE Fairy
    SET fairy_name = ?, power = ?
    WHERE fairy_id = ?;
    `;
  // declare values to [data.name, data.power, data.health, data.level, data. fairy_id] of the fairy table
  const VALUES = [data.fairy_name, data.power, data.fairy_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};
// ========================================= DELETE FAIRY BY ID =========================
module.exports.deleteById = (data, callback) => {
  // DELETE STATEMENT to delete existing records in the Fairy table where the ID matches the provided parameter
  const SQLSTATEMENT = `
      DELETE FROM Fairy 
      WHERE fairy_id = ?;
      ALTER TABLE Fairy AUTO_INCREMENT = 1; 
      `;
  // Setting auto increment to 1
  // ALTER TABLE Fairy Auto Increment = 1 explaination: ALTER TABLE modifies the Fairy table.
  // In the provided code snippet, the AUTO_INCREMENT value is set to 1 after deleting a Fairy from the Fairy table.
  // This is done to ensure that subsequent insertions into the table will generate unique IDs starting from 1.
  // Without resetting the AUTO_INCREMENT value, the next inserted ID would be the same as the ID of the deleted Fairy, potentially leading to conflicts or inconsistencies in the data.

  //declare values to [data.fairy_id] which is the id of the fairy
  const VALUES = [data.fairy_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ================================================== UPGRADE FAIRY ==============================================
module.exports.upgradeFairyById = (data, callback) => {
  // SQL Statement to upgrade the fairy's level and other attributes based on the new level
  const SQLSTATEMENT = `
  UPDATE Fairy
  SET level = ?,
  health = health + (SELECT level_extraHp FROM Fairy_level WHERE level_name = ?),
  points = points + (SELECT points FROM Task WHERE id =7),
  WHERE fairy_id = ? ;
    `;

  // Declare values for the SQL query
  const VALUES = [data.level_name, data.level_name, data.fairy_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectFairyHealthAndAttack = (data, callback) => {
  // SQL Statement to select health columns from the fairy table where the name matches the provided parameter
  const SQLSTATEMENT = `
      SELECT health
      FROM Fairy
      WHERE fairy_name = ?;

      SELECT damage
      FROM Attack
      WHERE attack = ?
      `;
  //declare values to [data.fairy_name, data.attack] which is the name of the Fairy and attack of the attack
  const VALUES = [data.fairy_name, data.attack];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectLevelByRequest = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT level
  FROM Fairy
  WHERE fairy_id = ?`;

  const VALUES = [data.fairy_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.getFairyCount = (callback) => {
  // SQL statement to count the number of records in the "User" table
  const SQLSTATEMENT = `
    SELECT COUNT(*) as fairyCount
    FROM Fairy;
  `;

  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, callback);
};
