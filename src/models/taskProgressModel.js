// Importing the database connection pool module
const pool = require("../services/db");

// ===================================================== INSERT SINGLE =========================================
module.exports.insertSingle = (data, callback) => {
  // Insert INTO statment add new records to a task, at the same time specifying the columns title, description and points that the values will be provided
  const SQLSTATEMENT = `
  INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
  VALUES (?, ?, ?, ?);          `;

  //declare values to [data.TaskProgress_id, data.task_id, data.completion_date, data.notes] which is the name and level of the TaskProgress

  const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ======================================= SELECT TASK PROGRESS BY LOCALS ID =================================
module.exports.selectTaskProgressByLocalsId = (data, callback) => {
  // SQL Statement to select all columns from the TaskProgress table where the ID matches the provided parameter
  const SQLSTATEMENT = `
      SELECT TaskProgress.progress_id, TaskProgress.user_id, TaskProgress.task_id, DATE(TaskProgress.completion_date) as completion_date, IFNULL(notes, " ") as notes
      FROM TaskProgress
      WHERE progress_id = ?;
      `;
  //declare values to [data.progress_id] which is the id of the Task Progress
  const VALUES = [data.progress_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// =========================================== SELECT BY ID ===============================================
module.exports.selectById = (data, callback) => {
  // SQL Statement to select all columns from the TaskProgress table where the ID matches the provided parameter
  const SQLSTATEMENT = `
      SELECT TaskProgress.progress_id, TaskProgress.user_id, TaskProgress.task_id, DATE(TaskProgress.completion_date) as completion_date, IFNULL(notes, " ") as notes
      FROM TaskProgress
      WHERE progress_id = ?;
      `;
  //declare values to [data.progress_id] which is the id of the Task Progress
  const VALUES = [data.progress_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// =============================================== UPDATE BY ID ===================================================
module.exports.updateById = (data, callback) => {
  // UPDATE query to modify the 'notes' columns in the 'TaskProgress' table
  const SQLSTATEMENT = `
          UPDATE TaskProgress
          SET notes = ?
          WHERE progress_id = ?;
          `;
  // declare values to [data.notes, data.progress_id] which is title, description, points, and id of the Task
  const VALUES = [data.notes, data.progress_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ============================================ DELETE BY ID ==============================================
module.exports.deleteById = (data, callback) => {
  // DELETE STATEMENT to delete existing records in the TaskProgress table where the ID matches the provided parameter
  const SQLSTATEMENT = `
        DELETE FROM TaskProgress
        WHERE progress_id = ?;
    
        ALTER TABLE TaskProgress AUTO_INCREMENT = 1; 
        `;
  // Setting auto increment to 1
  // ALTER TABLE TaskProgress Auto Increment = 1 explaination: ALTER TABLE modifies the TaskProgress table.
  // In the provided code snippet, the AUTO_INCREMENT value is set to 1 after deleting a TaskProgress from the TaskProgress table.
  // This is done to ensure that subsequent insertions into the table will generate unique IDs starting from 1.
  // Without resetting the AUTO_INCREMENT value, the next inserted ID would be the same as the ID of the deleted TaskProgress, potentially leading to conflicts or inconsistencies in the data.

  //declare values to [data.progress_id] which is the id of the TaskProgress
  const VALUES = [data.progress_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectAll = (callback) => {
  // SQL statement to select all records from the "Task" table
  const SQLSTATEMENT = `
      SELECT * 
      FROM TaskProgress;
      `;

  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, callback);
};
