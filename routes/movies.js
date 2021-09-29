const router = require("express").Router();
const { v4 } = require("uuid");
const { db } = require("../db");

router.get("/:id", async (req, res) => {
  try {
    const reviews = db.getData(`/movies/${req.params.id}`);
    res.json(reviews);
  } catch (error) {
    res.json([]);
  }
});

router.post("/", async (req, res) => {
  const { rating, userId, commentary, movieId } = req.body;

  try {
    db.push(`/movies/${movieId}[]`, { rating, commentary, userId, id: v4() });
    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "ko", message: error });
  }
});

module.exports = router;
