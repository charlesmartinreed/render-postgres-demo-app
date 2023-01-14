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

function returnNumberSegment(size = 3, min = 0, max = 9) {
  let curValue = "";

  for (let i = 0; i < size; i++) {
    curValue += Math.floor(Math.random() * (max - min) + min);
  }

  return curValue;
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

export const generateEmployeeCountryLocation = () => {
  const countries = [
    { countryName: "United Kingdom", countryCode: "44", areaCode: "151" },
    { countryName: "Canada", countryCode: "1", areaCode: "263" },
    { countryName: "Mexico", countryCode: "52", areaCode: "322" },
    { countryName: "Israel", countryCode: "964", areaCode: "972" },
    { countryName: "Germany", countryCode: "49", areaCode: "89" },
    { countryName: "Japan", countryCode: "81", areaCode: "075" },
    { countryName: "Italy", countryCode: "39", areaCode: "544" },
    { countryName: "Hungary", countryCode: "36", areaCode: "1" },
    { countryName: "Hong Kong", countryCode: "852", areaCode: null },
    { countryName: "India", countryCode: "91", areaCode: "44" },
    { countryName: "United States", countryCode: 1, areaCode: "214" },
    { countryName: "France", countryCode: "33", areaCode: "696" },
    { countryName: "South Korea", countryCode: "82", areaCode: "051" },
  ];

  return countries[Math.floor(Math.random() * (countries.length - 1 - 0) - 0)];
};

export const generateEmployeeContactInformation = () => {
  let { countryName, countryCode, areaCode } =
    generateEmployeeCountryLocation();

  // of course, the number length should vary
  // based upon a given country
  // but even I have my limits :/
  let contactNumber = [
    [`${"+"}${countryCode}${"-"}${areaCode ?? ""}`],
    returnNumberSegment(3),
    returnNumberSegment(4),
  ].join("-");

  return { location: countryName, contactNumber };
};

export const generateEmployeeStartDate = () => {
  let month = returnNumberSegment(1, 0, 12);

  // if month codes are 0,2,4,6,7,9,11, return up to 31 days
  // otherwise, return only 30
  let dayCount = [0, 2, 4, 6, 7, 9, 11].includes(month) ? 31 : 30;

  let date = returnNumberSegment(1, 1, dayCount);
  let year = returnNumberSegment(1, 2000, 2023);

  return dateComponentParser(year, month, date);
};

function dateComponentParser(
  year,
  month,
  date,
  hours = null,
  minutes = null,
  seconds = null,
  ms = null
) {
  const startDate = new Date(
    Date.UTC(year, month, date, hours, minutes, seconds, ms)
  );

  // return `year: ${year}, month: ${month}, date: ${date}`;

  return new Intl.DateTimeFormat("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(startDate);
}
