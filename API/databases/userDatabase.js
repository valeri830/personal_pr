const tools = require("../utility.js");

const pool = tools.mysqlPool();

async function registerUser(username, password) {
  const pool = await tools.mysqlPool();
  const sql_query =
    "INSERT INTO users (username, password) VALUES (@username, @password)";
  const result = await pool
    .request()
    .input("username", username)
    .input("password", password)
    .query(sql_query);
  return result;
}

async function findUserByUsername(username) {
  const pool = await tools.mysqlPool();
  const sql_query = "SELECT * FROM users WHERE username = @username";
  const result = await pool
    .request()
    .input("username", username)
    .query(sql_query);

  return result;
}

async function findUserByRefToken(refreshToken) {
  const pool = await tools.mysqlPool();
  const sql_query = "SELECT * FROM users WHERE refresh_token = @refresh_token";
  const result = await pool
    .request()
    .input("refresh_token", refreshToken)
    .query(sql_query);
  return result;
}

async function updateByUsername(username, password) {
  const pool = await tools.mysqlPool();
  const sql_query =
    "UPDATE users SET password = @password WHERE username = @username";
  const result = await pool
    .request()
    .input("password", password)
    .input("username", username)
    .query(sql_query);
  return result;
}

async function updateRefreshTokenByUsername(username, refreshToken) {
  const pool = await tools.mysqlPool();
  const sql_query =
    "UPDATE users SET refresh_token = @refreshToken WHERE username = @username";
  const result = await pool
    .request()
    .input("refreshToken", refreshToken)
    .input("username", username)
    .query(sql_query);
  return result;
}

async function deleteUser(username) {
  const pool = await tools.mysqlPool();
  const sql_query = "DELETE FROM users WHERE username = @username";
  const result = await pool
    .request()
    .input("username", username)
    .query(sql_query);
  return result;
}

module.exports = {
  registerUser,
  findUserByUsername,
  updateByUsername,
  updateRefreshTokenByUsername,
  findUserByRefToken,
  deleteUser,
};
