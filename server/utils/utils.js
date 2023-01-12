import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePaths = {
  Departments: "data-department-list.txt",
  Names: {
    First: "data-first-names.txt",
    Last: "data-last-names.txt",
  },
};

function parseCSVFromTXTFile(filePath) {
  let localFile = path.join(__dirname, "../datasets", filePath);

  let parsed = fs.readFileSync(localFile, "utf-8", (err, data) => {
    if (err) {
      throw new Error("Could not parse file with path", filePath);
    }

    return data;
  });

  return parsed.split(",");
}

export const generateEmployeeName = () => {
  let firstNames = parseCSVFromTXTFile(filePaths.Names.First);
  let lastNames = parseCSVFromTXTFile(filePaths.Names.Last);

  return {
    firstName:
      firstNames[Math.floor(Math.random() * (firstNames.length - 1 - 0) + 0)],
    lastName:
      lastNames[Math.floor(Math.random() * (lastNames.length - 1 - 0) + 0)],
  };
};

export const generateEmployeeDepartment = () => {
  let departments = parseCSVFromTXTFile(filePaths.Departments);

  return {
    department:
      departments[Math.floor(Math.random() * (departments.length - 1 - 0) + 0)],
  };
};

export const generateEmployeeID = () => {
  return uuid();
};

export const generateEmployeeContactNumber = (country) => {
  let numberSegements = [
    returnContactCNumberSegment(3),
    returnContactCNumberSegment(3),
    returnContactCNumberSegment(4),
  ];

  return numberSegements.map((group) => group.join("")).join("-");
};

const returnContactCNumberSegment = (count = 3, min = 0, max = 9) => {
  // why expose a min and max value?
  // area codes! Wouldn't want the area code to begin with a 0.
  // And it's not terribly common to see any other segment begin with 0 in North America either.
  let curSegment = [];

  let curValue;

  for (let i = 0; i < count; i++) {
    curValue = Math.floor(Math.random() * (max - min) + min);
    curSegment.push(curValue);
  }

  return curSegment;
};
