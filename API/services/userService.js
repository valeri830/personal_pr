const userDb = require("../databases/userDatabase.js");
const customErrs = require("../customErrors/customErrors.js");
const tools = require("../utility.js");
const bcrypt = require("bcrypt");

const passwordCheck = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
const hashRounds = 10;
const source = "User";

async function registerUser(req) {
  // Parameter assignment
  const username = req.body.username || false;
  const password = req.body.password || false;
  const passwordRepeat = req.body.password_repeat || false;

  // Parameter check
  if (!username || !password || !passwordRepeat)
    throw new customErrs.MissingParamError(
      "Username, password and passowrd repeat are required."
    );

  let userFound = await userDb.findUserByUsername(username);
  userFound = userFound["recordset"][0] || null;

  if (userFound != null)
    throw new customErrs.UserExistsError("Username already exists.");

  if (password != passwordRepeat) {
    throw new customErrs.IncorrectParamError("Passwords didn't match.");
  }

  if (password.length < 8)
    throw new customErrs.IncorrectParamError("Password is too short.");

  if (!passwordCheck.test(password))
    throw new customErrs.IncorrectParamError(
      "Password needs to contain at least one capital character, a small character and a special symbol."
    );

  // Encrypt password
  const hashedPwd = await bcrypt.hash(password, hashRounds);

  // Register user
  const response = await userDb.registerUser(username, hashedPwd);

  if (response["rowsAffected"] == 1) {
    return "User created.";
  } else {
    throw new customErrs.QueryError(
      `Failed in creating a user with username: "${username}".`
    );
  }
}

async function getUser(req) {
  // Parameter assignment
  const username = req.body.username || null;

  // Parameter check
  if (username == null) {
    throw new customErrs.MissingParamError("Username is missing.");
  }

  // Prepare the response of the request
  let result = await userDb.findUserByUsername(username);
  result = result["recordset"][0] || null;
  if (result == null) {
    throw new customErrs.IncorrectParamError(
      `Couldn't find any user with username: "${username}"`
    );
  } else {
    return result;
  }
}

async function updatePassword(req) {
  // Parameter assignment
  const username = req.body.username || null;
  const newPassword = req.body.new_password || null;
  const newPasswordRepeat = req.body.password_repeat || null;

  // Parameter check
  if (username == null) {
    throw new customErrs.MissingParamError("Username is missing.");
  }

  if (newPassword != newPasswordRepeat) {
    throw new customErrs.IncorrectParamError("Passwords didn't match.");
  }

  if (newPassword.length < 8)
    throw new customErrs.IncorrectParamError("Password is too short.");

  if (!passwordCheck.test(newPassword))
    throw new customErrs.IncorrectParamError(
      "Password needs to contain at least one capital character, a small character and a special symbol."
    );

  let result = await userDb.findUserByUsername(username);
  result = result["recordset"][0] || null;
  if (result == null) {
    throw new customErrs.IncorrectParamError(
      `Couldn't find any user with username: "${username}"`
    );
  }

  // Hash new password
  const hashedPwd = await bcrypt.hash(newPassword, hashRounds);

  // Prepare the response of the request
  const updateResult = await userDb.updateByUsername(username, hashedPwd);

  if (updateResult["rowsAffected"] == 1) {
    // Prepare the response of the request
    return "User updated.";
  } else {
    throw new customErrs.QueryError(
      `Failed in updating password of username: "${username}"`
    );
  }
}

async function removeUser(req) {
  // Parameter assignment
  const username = req.body.username || null;

  // Parameter check
  if (username == null) {
    throw new customErrs.MissingParamError(
      `User with username: "${username}" not found.`
    );
  }

  // Prepare the response of the request
  const result = await userDb.deleteUser(username);
  if (result["rowsAffected"] == 1) {
    return "User deleted successfully.";
  } else {
    throw new customErrs.QueryError(
      `Failed in deleting user with username: "${username}".`
    );
  }
}

module.exports = {
  registerUser,
  getUser,
  updatePassword,
  removeUser,
};
