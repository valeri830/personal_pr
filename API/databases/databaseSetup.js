/*
To reset or create the database tables for the first time,  use this script
*/

// const mysql = require('mysql2')

// const con = mysql.createConnection({
//   host: "property-viewing-server.database.windows.net",
//   port: "1433",
//   user: "adminV",
//   password: "V34024445v",
//   database: "propertyViewingDb",
// });

const odbc = require('odbc');

const connectionString = "Driver={ODBC Driver 18 for SQL Server};Server=tcp:property-viewing-server.database.windows.net,1433;Database=propertyViewingDb;Uid=adminV;Pwd=V34024445v;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;";

async function connectToDatabase() {
  try {
    const con = await odbc.connect(connectionString);
    console.log("Connected to the database");
    var sql =
      "CREATE TABLE users (id INT IDENTITY(1,1) PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), refresh_token VARCHAR(255))";
    // await con.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("Table users created");
    const userService = require("../services/userService.js")
    var dict = {
      body: {
        username: "TestUser1",
        password: "TestPassword1.",
        password_repeat: "TestPassword1."
      },
    };

    (async () => {
      try {
        let response = await userService.registerUser(dict)
        if (response != "User created.") {
          console.log("Couldn't add the first user");
        }
        else {
          console.log("First user added");
        }
      } catch (e) {
        console.log('Error happend while creating the new user: ', e.message)
      }
      finally {
        // Close the connection when done
        con.close();
        console.log("Connection closed");
      }
    })();

    // });

  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");

//   var sql =
//     "CREATE TABLE users (id INT AUTO_INCREMENT, PRIMARY KEY(Id), username VARCHAR(255), password VARCHAR(255), refresh_token VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table users created");
//     const userService = require("../services/userService.js")
//     var dict = {
//       body: {
//         username: "TestUser1",
//         password: "TestPassword1.",
//         password_repeat: "TestPassword1."
//       },
//     };

//     (async () => {
//       try {
//         let response = await userService.registerUser(dict)
//         if (response != "User created.") {
//           console.log("Couldn't add the first user");
//         }
//         else {
//           console.log("First user added");
//         }
//       } catch (e) {
//         console.log('Error happend while creating the new user: ', e.message)
//       }
//     })();
//   });

// });


// Call the function to connect to the database
connectToDatabase();