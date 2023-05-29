const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

// Establishing database connection
function mysqlPool() {
  const pool = mysql
    .createPool({
      host: "localhost",
      port: "3306",
      user: "root",
      password: "root",
      database: "property_website_db",
    })
    .promise();

  return pool;
}

// Default request handler to prevent the application from crashing
async function executeRequest(func, req, source) {
  let response;
  let return_error = {};
  try {
    response = await func(req);
  } catch (error) {
    return_error["error_sender"] = error.name;
    return_error["error_message"] = error.message;
    return return_error;
  }

  return { result: response };
}


module.exports = {
  executeRequest,
  mysqlPool,
};
