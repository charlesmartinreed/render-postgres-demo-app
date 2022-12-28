const app = require("express")();
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const auth = require("express-basic-auth");
const PORT = process.env.SERVER_PORT || 7000;
const CORS = require("cors");

const testUser = process.env.ADMIN_USERNAME;
const testPass = process.env.ADMIN_PASSWORD;

const staticEmployeeData = [
  {
    person_name: { last_name: "Reed", first_name: "Charles" },
    employee_id: uuidv4(),
    department: "Engineering",
    email_address: "charles@averyrealcompany.co",
    phone_number: generateNewPhoneNumber(),
    start_date: "7/01/2018",
    last_updated_date: null,
  },
  {
    person_name: { last_name: "Reed", first_name: "Martin" },
    department: "QA",
    employee_id: uuidv4(),
    email_address: "martin@averyrealcompany.co",
    phone_number: generateNewPhoneNumber(),
    start_date: "6/15/2020",
    last_updated_date: null,
  },
  {
    person_name: { last_name: "Summer", first_name: "Donna" },
    employee_id: uuidv4(),
    department: "Executive",
    email_address: "donna@averyrealcompany.co",
    phone_number: generateNewPhoneNumber(),
    start_date: "3/22/2013",
    last_updated_date: null,
  },
  {
    person_name: { last_name: "Lee", first_name: "Christopher" },
    employee_id: uuidv4(),
    department: "Human Resources",
    email_address: "christopher@averyrealcompany.co",
    phone_number: generateNewPhoneNumber(),
    start_date: "7/01/2018",
    last_updated_date: null,
  },
];

app.use(CORS({ origin: "*" }));

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
    returnRandomNumbers(3),
    returnRandomNumbers(3),
    returnRandomNumbers(4),
  ];

  return numberGroups.map((group) => group.join("")).join("-");
}

function returnRandomNumbers(count, min = 0, max = 9) {
  let values = [];
  let value;

  for (let i = 0; i < count; i++) {
    value = Math.floor(Math.random() * (max - min) + min);
    values.push(value);
  }

  return values;
}

generateNewPhoneNumber();

app.get("/directory", (req, res) => {
  res.status(200).json(staticEmployeeData);
});

app.get("/directory/:letterMatch", (req, res) => {
  let queryLetter = req.params.letterMatch;

  let results = staticEmployeeData.filter(
    ({ person_name }) =>
      person_name.last_name.slice(0).toLowerCase() ===
      letterMatch.slice(0).toLowerCase()
  );

  res.status(200).json(results);
});

app.get("/directory/:employee", (req, res) => {
  let nameParam = req.params.employee;

  let result = staticEmployeeData.filter(
    ({ person_name }) =>
      person_name.last_name.toLowerCase() === nameParam.toLowerCase() ||
      person_name.first_name.toLowerCase() === nameParam.toLowerCase()
  );

  res.status(200).json(result);
});

app.listen(PORT, () =>
  console.log(`Success! API server now running on PORT #${PORT} `)
);
