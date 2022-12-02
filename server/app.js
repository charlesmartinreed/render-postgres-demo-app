const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const CORS = require("cors");

const staticEmployeeData = [
  {
    person_name: { last_name: "Reed", first_name: "Charles" },
    person_department: "engineering",
    person_email_address: "charles@averyrealcompany.co",
  },
  {
    person_name: { last_name: "Summer", first_name: "Donna" },
    person_department: "executive",
    person_email_address: "donna@averyrealcompany.co",
  },
];

app.use(CORS({ origin: ["http://localhost:5500"] }));

app.get("/directory", (req, res) => {
  res.status(200).json(staticEmployeeData);
});

app.get("/directory/:employee", (req, res) => {
  let nameParam = req.params.employee;

  let result = staticEmployeeData.filter(
    ({ person_name }) =>
      person_name.last_name === nameParam ||
      person_name.first_name === nameParam
  );

  res.status(200).json(result);
});

app.listen(PORT, () =>
  console.log(`Success! API server now running on PORT #${PORT} `)
);
