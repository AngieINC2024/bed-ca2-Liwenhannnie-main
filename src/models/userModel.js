// Importing the database connection pool module
const pool = require("../services/db");

// ========================================= SECTION A Q1 POST USER =============================================
// ============================================ CREATE NEW USER =================================================

module.exports.insertSingle = (data, callback) => {
  // Insert INTO statment add new records to a user, at the same time specifying the columns username and email that the values will be provided
  const SQLSTATEMENT = `
      INSERT INTO User (username, email)
      VALUES (?, ?);
      `;
  //declare values to [data.username, data.email] which is the name and level of the user
  const VALUES = [data.username, data.email];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ========================================== READ USER BY LOCALS ID ============================================
module.exports.selectUserByLocalsId = (data, callback) => {
  // SQL Statement to select all columns from the User table where the ID matches the provided parameter
  const SQLSTATEMENT = `
    SELECT *
    FROM USER
    WHERE user_id = ?;
    `;
  //declare values to [data.user_id] which is the id of the User
  const VALUES = [data.user_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ===================================== SECTION A Q2 GET ALL USER ===============================================
// ========================================= SELECT ALL USERS ====================================================
module.exports.selectAll = (callback) => {
  // SQL statement to select all records from the "User" table
  const SQLSTATEMENT = `
    SELECT * 
    FROM USER;
    `;

  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, callback);
};

// ========================================SECTION A Q3 GET USER BY USER ID ===================================
// ========================================== SELECT USER BY USER ID =================================================
module.exports.selectUserByIdWithTaskPoints = (data, callback) => {
  // SQL statement to select Records from the "User" table Where User.user_id = TaskProgress.user_id and Taskprogress.task_id = Task.task_id matches and returns 0 if user has no points. Group BY  summarises rows that have the same values into summary rows
  const SQLSTATEMENT = `
  SELECT  User.user_id, User.username, User.email, IFNULL(SUM(Task.points), 0)  as total_points From User
  LEFT JOIN TaskProgress ON User.user_id = TaskProgress.user_id
  LEFT JOIN Task ON TaskProgress.task_id = Task.task_id
  WHERE User.user_id = ?
  GROUP BY User.user_id, User.username,User.email 
    `;

  // decalre values to [data.user_id] which is the user_id of the user
  const VALUES = [data.user_id];
  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// =================================================== SELECT BY ID ==============================================
module.exports.selectById = (data, callback) => {
  // SQL Statement to select all columns from the User table where the ID matches the provided parameter
  const SQLSTATEMENT = `
    SELECT *
    FROM USER
    WHERE user_id = ?;
    `;
  //declare values to [data.user_id] which is the id of the User
  const VALUES = [data.user_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ================================= SECTION A Q4 UPDATE USER BY ID ==============================================
// ======================================= UPDATE USER BY ID ======================================================
module.exports.updateById = (data, callback) => {
  // UPDATE query to modify the 'username' ,'email' and 'password' columns in the 'User' table
  const SQLSTATEMENT = `
    UPDATE USER
    SET username = ?, email = ?
    WHERE user_id = ?;
    `;
  // declare values to [data.username, data.email, data.id] which is name, level and id of the User
  const VALUES = [data.username, data.email, data.user_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ============================================ CHECK USERNAME ===================================================
module.exports.checkUsername = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT *
    FROM USER
    WHERE username = ?;
    `;
  //declare values to [data.username] which is the username of the User
  const VALUES = [data.username];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};
// =========================================== CHECK EMAIL ==================================================

module.exports.checkEmail = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT *
    FROM USER
    WHERE email = ?;
    `;
  //declare values to [data.email] which is the email of the User
  const VALUES = [data.email];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};
// ======================================== SECTION A Q5 DELETE USER BY ID ===============================================
// =============================================== DELETE BY ID =========================================================
module.exports.deleteById = (data, callback) => {
  // DELETE STATEMENT to delete existing records in the User table where the ID matches the provided parameter
  const SQLSTATEMENT = `
    DELETE FROM USER 
    WHERE user_id = ?;

    ALTER TABLE User AUTO_INCREMENT = 1; 
    `;
  // Setting auto increment to 1
  // ALTER TABLE User Auto Increment = 1 explaination: ALTER TABLE modifies the User table.
  // In the provided code snippet, the AUTO_INCREMENT value is set to 1 after deleting a User from the User table.
  //  This is done to ensure that subsequent insertions into the table will generate unique IDs starting from 1.
  // Without resetting the AUTO_INCREMENT value, the next inserted ID would be the same as the ID of the deleted User, potentially leading to conflicts or inconsistencies in the data.

  //declare values to [data.user_id] which is the id of the User
  const VALUES = [data.user_id];

  // Using the database connection pool to execute the SQL query with parameterized values
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectByUsername = (data, callback) => {
  const SQLSTATMENT = `
      SELECT * FROM User
      WHERE username = ?;
      `;
  const VALUES = [data.username];

  pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.selectByUsernameOrEmail = (data, callback) => {
  const SQLSTATMENT = `
        SELECT * FROM User
        WHERE username = ? or email = ?;
        `;
  const VALUES = [data.username, data.email];

  pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.getUserCount = (callback) => {
  // SQL statement to count the number of records in the "User" table
  const SQLSTATEMENT = `
    SELECT COUNT(*) as userCount
    FROM USER;
  `;

  // Using the database connection pool to execute the SQL query
  pool.query(SQLSTATEMENT, callback);
};
