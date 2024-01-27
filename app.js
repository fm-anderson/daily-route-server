require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

async function fetchSpreadsheetData(dataUrl) {
  try {
    const apiKey = process.env.API_KEY;
    const urlWithKey = `${dataUrl}?apiKey=${apiKey}`;
    const response = await axios.get(urlWithKey);
    return response.data;
  } catch (error) {
    console.error("Error making request: " + error);
    throw error;
  }
}

app.get("/get-neti-data", async (req, res) => {
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
