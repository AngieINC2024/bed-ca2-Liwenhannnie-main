// Importing the database connection pool module
const pool = require("../services/db");

// ========================================== INSERT SINGLE =============================================
module.exports.insertSingle = (data, callback) => {
  // Insert INTO statment add new records to a task, at the same time specifying the columns title, description and points that the values will be provided
  const SQLSTATEMENT = `
        INSERT INTO Task (title, description, points )
        VALUES (?, ?, ?);
        `;
  //declare values to [data.title, data.description, data.points which is the name and level of the task
  const VALUES = [data.title, data.description, data.points];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ============================================ SELECT ALL =========================================================
module.exports.selectAll = (callback) => {
  // SQL statement to select all records from the "Task" table
  const SQLSTATEMENT = `
      SELECT * 
      FROM Task;
      `;

  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, callback);
};

// ================================================= SELECT TASK BY LOCALS ID ========================================
module.exports.selectTaskByLocalsId = (data, callback) => {
  // SQL Statement to select all columns from the User table where the ID matches the provided parameter
  const SQLSTATEMENT = `
      SELECT *
      FROM Task
      WHERE task_id = ?;
      `;
  //declare values to [data.task_id] which is the task_id of the task
  const VALUES = [data.task_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// =========================================== SELECT BY ID ========================================================
module.exports.selectById = (data, callback) => {
  // SQL Statement to select all columns from the User table where the ID matches the provided parameter
  const SQLSTATEMENT = `
      SELECT *
      FROM Task
      WHERE task_id = ?;
      `;
  //declare values to [data.task_id] which is the task_id of the task
  const VALUES = [data.task_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// =========================================== UPDATE BY ID ========================================================
module.exports.updateById = (data, callback) => {
  // UPDATE query to modify the 'title', 'description', and 'points' columns in the 'Task' table
  const SQLSTATEMENT = `
        UPDATE Task
        SET title = ?, description = ?, points = ?
        WHERE task_id = ?;
        `;
  // declare values to [data.title, data.description, data.points, data.id] which is title, description, points, and id of the Task
  const VALUES = [data.title, data.description, data.points, data.task_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// =========================================== DELETE BY ID ===============================================================
module.exports.deleteById = (data, callback) => {
  // DELETE STATEMENT to delete existing records in the User table where the ID matches the provided parameter
  const SQLSTATEMENT = `
      DELETE FROM Task
      WHERE task_id = ?;
  
      ALTER TABLE Task AUTO_INCREMENT = 1; 
      `;
  // Setting auto increment to 1
  // ALTER TABLE User Auto Increment = 1 explaination: ALTER TABLE modifies the User table.
  // In the provided code snippet, the AUTO_INCREMENT value is set to 1 after deleting a User from the User table.
  // This is done to ensure that subsequent insertions into the table will generate unique IDs starting from 1.
  // Without resetting the AUTO_INCREMENT value, the next inserted ID would be the same as the ID of the deleted User, potentially leading to conflicts or inconsistencies in the data.

  //declare values to [data.task_id] which is the id of the User
  const VALUES = [data.task_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};
