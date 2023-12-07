const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/getDataBysubcategory/:category_id", async (req, res) => {
  const category_id = req.params.category_id;
  try {
    const result = await pool.query(
      "SELECT file_data FROM dictionary WHERE category_id =$1 AND is_active = true",
      [category_id]
    );
    res.send(result.rows);
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
