// const mysql = require("mysql2");
const odbc = require('odbc');
const connectionString = "Driver={ODBC Driver 18 for SQL Server};Server=tcp:property-viewing-server.database.windows.net,1433;Database=propertyViewingDb;Uid=adminV;Pwd=V34024445v;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;";

const dotenv = require("dotenv");
dotenv.config();

// Establishing database connection
async function mysqlPool(sql) {
  const connection = await odbc.connect(connectionString);
  console.log(sql);
  try {
    const result = await connection.query(sql);
    return result;
  } catch (err) {
    throw err;
  } finally {
    connection.close();
  }
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
