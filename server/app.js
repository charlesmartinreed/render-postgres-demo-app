import fs from "fs";
import path from "path";
import express from "express";

import { Employee } from "./utils/people.js";

let testEmployee = new Employee();
console.log("name is", testEmployee.person_name);
console.log("id is", testEmployee.employee_id);
console.log("department is", testEmployee.employee_department);
console.log("email address is", testEmployee.email_address);
console.log("contact info is", testEmployee.contact_information);
console.log("start date is", testEmployee.start_date);
// console.log("current location is", testEmployee.country_of_residence);

const app = express();

import * as dotenv from "dotenv";
dotenv.config();

import auth from "express-basic-auth";

const PORT = process.env.SERVER_PORT || 7000;
const testUser = process.env.ADMIN_USERNAME;
const testPass = process.env.ADMIN_PASSWORD;

// IN THIS BASIC IMPLEMENTATION
// USERNAMES AND PASSWORDS ARE DELEGATED BY SYSOP
// SO THE FRONT END WON'T ACTUALLY HAVE A SIGN UP
const authCheck = auth({
  users: { testUser: testPass },
  authorizer: (username, password) => {
    return (
      auth.safeCompare(username, testUser) &&
      auth.safeCompare(password, testPass)
    );
  },
  unauthorizedResponse: handleUnauthorized,
});

function handleUnauthorized(req) {
  return JSON.stringify({ msg: "Access Denied" });
}

app.get("/directory", (req, res) => {
  res.status(200).json(staticEmployeeData);
});

app.get("/directory/:employeeID", (req, res) => {
  let nameParam = req.params.employeeID;

  let result = staticEmployeeData.filter(
    (person) => person.employee_id === nameParam
  );

  res.status(200).json(result);
});

app.listen(PORT, () =>
  console.log(`Success! API server now running on PORT #${PORT} `)
);

// const formatTextFile = (filePath) => {
//   let currentContents;

//   currentContents = fs.readFileSync(
//     path.join(__dirname, "/datasets", filePath),
//     "utf-8",
//     (err, data) => {
//       if (err) {
//         console.error(err);
//         return null;
//       }
//       return data;
//     }
//   );

//   if (currentContents) {
//     currentContents = currentContents
//       .split(",")
//       .map((n) => {
//         return n.slice(0, 1).toUpperCase() + n.slice(1).toLowerCase();
//       })
//       .join(",");

//     fs.writeFileSync(
//       path.join(__dirname, "/datasets", filePath),
//       currentContents
//     );
//   }
// };
