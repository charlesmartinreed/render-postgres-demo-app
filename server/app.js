const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const CORS = require("cors");

app.use(CORS({ origin: ["http://localhost:5500"] }));

app.get("/api", (req, res) => {
  res.status(200).json([
    {
      name: "Charles",
      department: "engineering",
      email_address: "charles@averyrealcompany.co",
    },
  ]);
});

app.listen(PORT, () => console.log(`Success! Now listening on PORT #${PORT} `));
