// Import the model module
const userModel = require("../models/userModel.js");

// ========================================= SECTION A Q1 POST USER =============================================
// ============================================= CREATE NEW USER ================================================
module.exports.createNewUser = (req, res, next) => {
  // Checks if the required name field exists in the request body
  if (req.body.username == undefined || req.body.email == undefined) {
    res.status(400).send("Error: Missing username or email"); // If the required usernane or email field is missing, it sends a 400 status code with an error message.
    return;
  }
  // Creates a new User entry using the insertSingle function from the userModel.js module and returns the result as a JSON response with 201 status code
  const data = {
    username: req.body.username,
    email: req.body.email,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewUser:", error);
      res.status(500).json(error);
    } else {
      res.locals.id = results.insertId;
      next();
    }
  };

  userModel.insertSingle(data, callback);
};

// ========================================== READ USER BY LOCALS ID ===============================================
module.exports.readUserByLocalsId = (req, res, next) => {
  // Extracts the user ID from the request parameters and calls the selectById function from the PlayerModel.js module with the ID as an argument
  const data = {
    user_id: res.locals.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readUserByLocalsId:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "User not found",
        }); // If the User is not found, it sends a 404 status code with a message indicating that the Player was not found
      } else res.status(201).json(results[0]); // If the User is found, it returns their data as a JSON response with a 200 status code which means okay
    }
  };

  userModel.selectUserByLocalsId(data, callback);
};
// ====================================== SECTION A Q2 GET ALL USER ================================================
// ========================================== SELECT ALL USERS =====================================================
module.exports.readAllUser = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllUser:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  userModel.selectAll(callback);
};

// ====================================== SECTION A Q3 GET USER BY USER ID ===========================================
// ========================================== SELECT USER BY USER ID =================================================
module.exports.readUserInfoById = (req, res, next) => {
  // Extracts the User ID from the request parameters and calls the selectById function from the userModel.js module with the ID as an argument
  const data = {
    user_id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readUserInfoById:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        res.status(200).json(results[0]);
      } // If the User is found, it returns their data as a JSON response with a 200 status code which means okay
    }
  };

  userModel.selectUserByIdWithTaskPoints(data, callback);
};

// ===================================== SECTION A Q4 UPDATE USER BY ID ================================================
// ==================================================== CHECK USERNAME ===================================================
module.exports.checkUsername = (req, res, next) => {
  const data = {
    username: req.body.username,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkUsernameEmail:", error);
      return res.status(500).json(error);
    } else {
      if (results.length != 0) {
        return res.status(409).json({
          message: "Username already exist.",
        });
      }
      next();
    }
  };
  userModel.checkUsername(data, callback);
};

// ========================================================= CHECK EMAIL ================================================================
module.exports.checkEmail = (req, res, next) => {
  if (req.body.username == undefined || req.body.email == undefined) {
    res.status(400).send("Error: User is undefined");
    return;
  }

  const data = {
    email: req.body.email,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkEmail:", error);
      return res.status(500).json(error);
    } else {
      if (results.length != 0) {
        return res.status(409).json({
          message: "Email already exist.",
        });
      }
      next();
    }
  };
  userModel.checkEmail(data, callback);
};
// ============================================ UPDATE BY ID ==========================================================
module.exports.updateUserById = (req, res, next) => {
  // Checks if the username and email field exist in the request body
  if (req.body.username == undefined || req.body.email == undefined) {
    // If any of them are missing, it sends a 400 status request body
    res.status(400).json({
      message: "Error: username or email is undefined",
    });
    return;
  }
  // Otherwise, it extracts the ID,username and email from the requested parameters and body and calls the updateById function from the userModel.js module to update the user's information
  const data = {
    username: req.body.username,
    email: req.body.email,
    user_id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateUserById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          // If the User is not found, it sends a 404 status code with a message indicating  that the User was not found.
          message: "User not found",
        });
      } else {
        res.locals.id = data.user_id;
        next(); // If the User is found and successfully updated, it calls the next middleware function
      }
    }
  };

  userModel.updateById(data, callback);
};

// ======================================= SECTION A Q5 DELETE USER BY ID ============================================
// =========================================== UPDATE BY ID ==========================================================
module.exports.deleteUserById = (req, res, next) => {
  // Extracts the UserID from the request parameters and calls the deleteById function from the taskModel.js module.
  const data = {
    user_id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteUserById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "User not found", // If the User is not found, it sends a 404 status code with a message indicating that the user was not found
        });
      } else res.status(204).send(); // If User is found and successfully deleted, it sends a 204 status code (No content)
    }
  };

  userModel.deleteById(data, callback);
};

module.exports.login = (req, res, next) => {
  if ((req.body.username == undefined, req.body.password == undefined)) {
    res.status(400).json({ message: "Username or Password is undefined" });
    return;
  }
  const data = {
    username: req.body.username,
    password: req.body.password,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error login:", error);
      res.status(500).json(error);
    } else {
      if (results.length != 0) {
        res.locals.userId = results[0]["user_id"];
        res.locals.hash = results[0]["password"];
        next();
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    }
  };

  userModel.selectByUsername(data, callback);
};

module.exports.register = (req, res, next) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: res.locals.hash,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error register:", error);
      res.status(500).json(error);
    } else {
      res.locals.user_id = results.insertId;
      res.locals.message = `User ${data.username} created successfully.`;
      next();
    }
  };

  userModel.insertSingle(data, callback);
};

module.exports.checkUsernameOrEmailExist = (req, res, next) => {
  if (Object.keys(req.body).length != 3) {
    res
      .status(400)
      .json({ message: "Username, Email, or Password is undefined" });
    return;
  }
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkUsernameOrEmailExist:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        next();
      } else {
        res.status(409).json({
          message: "Username or email already exists",
        });
      }
    }
  };

  userModel.selectByUsernameOrEmail(data, callback);
};

module.exports.getUserCount = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getUserCount:", error);
      res.status(500).json(error);
    } else {
      const userCount = results[0].userCount;
      res.status(200).json({ message: "Number of Users:", userCount });
    }
  };
  userModel.getUserCount(callback);
};
