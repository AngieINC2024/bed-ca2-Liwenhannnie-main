// Importing the database connection pool module
const pool = require("../services/db");

// ========================================== INSERT SINGLE ======================================================
module.exports.insertSingle = (data, callback) => {
  // Insert INTO statment add new records to a fairy, at the same time specifying the columns name, power health, level that the values will be provided
  const SQLSTATEMENT = `
            INSERT INTO Enemy (enemy_name, power, health)
            VALUES ( ?, ?, 300);
            `;
  //declare values to [data.name, data.power] which is the name and level of the fairy
  const VALUES = [data.name, data.power];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ======================================= SELECT ENEMY BY LOCALS ID ==========================================
module.exports.selectEnemyByLocalsId = (data, callback) => {
  // SQL Statement to select all columns from the enemy table where the ID matches the provided parameter
  const SQLSTATEMENT = `
      SELECT *
      FROM Enemy
      WHERE enemy_id = ?;
      `;
  //declare values to [data.enemy_id] which is the id of the Enemy
  const VALUES = [data.enemy_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ============================================= SELECT BY ID ===================================================
module.exports.selectById = (data, callback) => {
  // SQL Statement to select all columns from the enemy table where the ID matches the provided parameter
  const SQLSTATEMENT = `
        SELECT *
        FROM Enemy
        WHERE enemy_id = ?;
        `;
  //declare values to [data.enemy_id] which is the id of the enemy
  const VALUES = [data.enemy_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// =========================================== UPDATE BY ID ======================================================
module.exports.updateById = (data, callback) => {
  // UPDATE query to modify the 'name' ,'power' and 'health' columns in the 'enemy' table
  const SQLSTATEMENT = `
      UPDATE Enemy
      SET enemy_name, power = ?,  health = ?
      WHERE enemy_id = ?;
      `;
  // declare values to [data.name, data.power, data.health, data.enemy_id] which is the name, power health and enemy_id
  const VALUES = [data.enemy_name, data.power, data.health, data.enemy_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ============================================ DELETE BY ID ==========================================
module.exports.deleteById = (data, callback) => {
  // DELETE STATEMENT to delete existing records in the Enemy table where the ID matches the provided parameter
  const SQLSTATEMENT = `
    DELETE FROM Enemy
    WHERE Enemy_id = ?;
    
    ALTER TABLE Enemy AUTO_INCREMENT = 1; 
    `;
  // Setting auto increment to 1
  // ALTER TABLE Enemy Auto Increment = 1 explaination: ALTER TABLE modifies the Enemy table.
  // In the provided code snippet, the AUTO_INCREMENT value is set to 1 after deleting a Enemy from the Enemy table.
  // This is done to ensure that subsequent insertions into the table will generate unique IDs starting from 1.
  // Without resetting the AUTO_INCREMENT value, the next inserted ID would be the same as the ID of the deleted Enemy, potentially leading to conflicts or inconsistencies in the data.

  //declare values to [data.enemy_id] which is the id of the Enemy
  const VALUES = [data.enemy_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ============================================ Check Enemy Health ==========================================

module.exports.selectEnemyHealthAndAttack = (data, callback) => {
  // SQL Statement to select all columns from the enemy table where the ID matches the provided parameter
  const SQLSTATEMENT = `
      SELECT health
      FROM Enemy
      WHERE enemy_name = ?;

      SELECT damage
      FROM Attack
      WHERE attack = ?
      `;
  //declare values to [data.enemy_name, data.attack] which is the name of the Enemy and attack of the attack
  const VALUES = [data.enemy_name, data.attack];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.updateDefeatedEnemy = (data, callback) => {
  // SQL Statement to upgrade the fairy's level and other attributes based on the new level
  const SQLSTATEMENT = `
  UPDATE Enemy
  SET health = 0
  WHERE enemy_name = ? ;

  UPDATE Fairy
  SET points = points + 20
  WHERE fairy_name = ?

  INSERT INTO Timeout (name)
  VALUES (?)
    `;

  // Declare values for the SQL query
  const VALUES = [data.enemy_name, data.fairy_name, data.enemy_name];
  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectAll = (callback) => {
  // SQL statement to select all records from the "Task" table
  const SQLSTATEMENT = `
      SELECT * 
      FROM Enemy;
      `;

  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, callback);
};

module.exports.getEnemyCount = (callback) => {
  // SQL statement to count the number of records in the "User" table
  const SQLSTATEMENT = `
    SELECT COUNT(*) as enemyCount
    FROM Enemy;
  `;

  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, callback);
};
