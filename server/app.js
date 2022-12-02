const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const CORS = require("cors");

const staticEmployeeData = [
  {
    person_name: { last_name: "Reed", first_name: "Charles" },
    person_department: "Engineering",
    person_email_address: "charles@averyrealcompany.co",
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
