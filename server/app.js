import fs from "fs";
import path from "path";
import express from "express";

const app = express();
import { v4 as uuidv4 } from "uuid";

import * as dotenv from "dotenv";
dotenv.config();

import auth from "express-basic-auth";

const PORT = process.env.SERVER_PORT || 7000;
const testUser = process.env.ADMIN_USERNAME;
const testPass = process.env.ADMIN_PASSWORD;

// const staticEmployeeData = [
//   {
//     person_name: {
//       last_name: generateRandomName(namePaths.Last),
//       first_name: generateRandomName(namePaths.First),
//     },
//     employee_id: uuidv4(),
//     department: "Engineering",
//     email_address: "charles@averyrealcompany.co",
//     phone_number: generateNewPhoneNumber(),
//     start_date: "7/01/2018",
//     last_updated_date: null,
//   },
//   {
//     person_name: {
//       last_name: generateRandomName(namePaths.Last),
//       first_name: generateRandomName(namePaths.First),
//     },
//     department: "QA",
//     employee_id: uuidv4(),
//     email_address: "martin@averyrealcompany.co",
//     phone_number: generateNewPhoneNumber(),
//     start_date: "6/15/2020",
//     last_updated_date: null,
//   },
//   {
//     person_name: {
//       last_name: generateRandomName(namePaths.Last),
//       first_name: generateRandomName(namePaths.First),
//     },
//     employee_id: uuidv4(),
//     department: "Executive",
//     email_address: "donna@averyrealcompany.co",
//     phone_number: generateNewPhoneNumber(),
//     start_date: "3/22/2013",
//     last_updated_date: null,
//   },
//   {
//     person_name: {
//       last_name: generateRandomName(namePaths.Last),
//       first_name: generateRandomName(namePaths.First),
//     },
//     employee_id: uuidv4(),
//     department: "Human Resources",
//     email_address: "christopher@averyrealcompany.co",
//     phone_number: generateNewPhoneNumber(),
//     start_date: "7/01/2018",
//     last_updated_date: null,
//   },
// ];

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

function generateNewPhoneNumber() {
  let numberGroups = [
    returnRandomPhoneNumberSegment(3),
    returnRandomPhoneNumberSegment(3),
    returnRandomPhoneNumberSegment(4),
  ];

  return numberGroups.map((group) => group.join("")).join("-");
}

function returnRandomPhoneNumberSegment(count, min = 0, max = 9) {
  let values = [];
  let value;

  for (let i = 0; i < count; i++) {
    value = Math.floor(Math.random() * (max - min) + min);
    values.push(value);
  }

  return values;
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
