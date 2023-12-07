const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/getlanguage/:languageId", async (req, res) => {
  try {
    const languageId = req.params.languageId;
    const result = await pool.query(
      "SELECT language_name FROM language WHERE language_id =$1",
      [languageId]
    );

    res.send(result.rows);
  } catch (error) {
    console.error("Error getting languages:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
