const app = require("express")();

require("dotenv").config();

const auth = require("express-basic-auth");
const PORT = process.env.SERVER_PORT || 7000;
const CORS = require("cors");

const testUser = process.env.ADMIN_USERNAME;
const testPass = process.env.ADMIN_PASSWORD;

const staticEmployeeData = [
  {
    person_name: { last_name: "Reed", first_name: "Charles" },
    person_department: "Engineering",
    person_email_address: "charles@averyrealcompany.co",
  },
  {
    person_name: { last_name: "Reed", first_name: "Martin" },
    person_department: "QA",
    person_email_address: "martin@averyrealcompany.co",
  },
  {
    person_name: { last_name: "Summer", first_name: "Donna" },
    person_department: "Executive",
    person_email_address: "donna@averyrealcompany.co",
  },
  {
    person_name: { last_name: "Lee", first_name: "Christopher" },
    person_department: "Human Resources",
    person_email_address: "christopher@averyrealcompany.co",
  },
];

app.use(CORS({ origin: "*", methods: ["GET"] }));

// IN THIS BASIC IMPLEMENTATION
// USERNAMES AND PASSWORDS ARE DELEGATED BY SYSOP
// SO THE FRONT END WON'T ACTUALLY HAVE A SIGN UP
app.use(
  auth({
    users: { testUser: testPass },
    unauthorizedResponse: handleUnauthorized,
  })
);

function handleUnauthorized(req) {
  req.auth
    ? "Those credentials are incorrect"
    : "Please provide the correct credentials";
}

app.get("/directory", (req, res) => {
  res.status(200).json(staticEmployeeData);
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
