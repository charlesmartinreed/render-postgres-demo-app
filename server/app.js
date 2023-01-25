import fs from "fs";
import path from "path";
import express from "express";

import { Employee } from "./utils/people.js";

const dbIsInitialized = false;

function updateEmployeeListInDB() {
  // for testing purposes only, as opposed to manual entry
  // first check that the DB is empty
  // if empty, generate a collection of Employees and save to DB
  if (!dbIsInitialized) {
    let employees = [];
    for (let i = 0; i < 10; i++) employees.push(new Employee());
    employees.forEach((employee) => console.log(employee.person_name));
  }

  if (dbIsInitialized) {
    console.log("db contains existing data");
  }
}

const app = express();

import * as dotenv from "dotenv";
dotenv.config();

import auth from "express-basic-auth";
import e from "express";

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
  res.status(200).json(dummyEmployeeList);
});

app.get("/directory/:employeeID", (req, res) => {
  let nameParam = req.params.employeeID;

  let result = dummyEmployeeList.filter(
    (person) => person.employee_id === nameParam
  );

  res.status(200).json(result);
});

updateEmployeeListInDB();

app.listen(PORT, () =>
  console.log(`Success! API server now running on PORT #${PORT} `)
);
