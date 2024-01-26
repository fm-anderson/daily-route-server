require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

async function fetchSpreadsheetData(dataUrl) {
  try {
    const response = await axios.get(dataUrl);
    return response.data;
  } catch (error) {
    console.error("Error making request: " + error);
    throw error;
  }
}

app.get("/get-neti-data", async (req, res) => {
  const origin = req.headers.origin;
  if (!allowedOrigins.includes(origin)) {
    return res.status(403).send("Access denied");
  }

  try {
    const data = await fetchSpreadsheetData(process.env.TECH_INSTALL_DATA);
    res.json({ data });
  } catch (error) {
    res.status(500).send("Error retrieving data: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
