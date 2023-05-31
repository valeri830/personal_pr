const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

// Establishing database connection
function mysqlPool() {
  const sql = require("mssql");

  const config = {
    server: "property-viewing-server.database.windows.net",
    user: "adminV",
    password: "V34024445v",
    database: "propertyViewingDb",
    options: {
      encrypt: true, // Enable encryption
      trustServerCertificate: true, // Trust the server's SSL certificate
    },
  };
  const pool = new sql.ConnectionPool(config)
  
  return pool.connect();
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
