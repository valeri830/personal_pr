/*
To reset or create the database tables for the first time,  use this script
*/
// const mysql = require('mysql2')

// const con = mysql.createConnection({
//   host: "property-viewing-server.database.windows.net",
//   user: "450168@student.fontys.nl",
//   password: "V34024445v",
//   database: "property_website_db",
// });

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

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");

//   // var sql =
//   //   "CREATE TABLE users (id INT AUTO_INCREMENT, PRIMARY KEY(Id), username VARCHAR(255), password VARCHAR(255), refresh_token VARCHAR(255))";
//   // con.query(sql, function (err, result) {
//   //   if (err) throw err;
//   //   console.log("Table users created");
//   const userService = require("../services/userService.js");
//   var dict = {
//     body: {
//       username: "TestUser1",
//       password: "TestPassword1.",
//       password_repeat: "TestPassword1.",
//     },
//   };

//   (async () => {
//     try {
//       let response = await userService.registerUser(dict);
//       if (response != "User created.") {
//         console.log("Couldn't add the first user");
//       } else {
//         console.log("First user added");
//       }
//     } catch (e) {
//       console.log("Error happend while creating the new user: ", e.message);
//     }
//   })();
//   // });
// });


async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log("Connected to the Azure SQL Server successfully!");
    const userService = require("../services/userService.js");
  var dict = {
    body: {
      username: "TestUser1",
      password: "TestPassword1.",
      password_repeat: "TestPassword1.",
    },
  };

  (async () => {
    try {
      let response = await userService.registerUser(dict);
      if (response != "User created.") {
        console.log("Couldn't add the first user");
      } else {
        console.log("First user added");
      }
    } catch (e) {
      console.log("Error happend while creating the new user: ", e.message);
    }
  })();
  } catch (error) {
    console.error("Error connecting to the Azure SQL Server:", error);
  }
}

connectToDatabase()