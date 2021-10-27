const router = require("express").Router();
const { v4 } = require("uuid");
const { db } = require("../db");

const populate = (reviews, users) => {
  return reviews.map(review => {
    const { password, ...other} = users.find(u => u.id === review.userId)
    return {
      ...review,
      user: other
    }
  })
}

router.get("/:id", async (req, res) => {
  try {
    const reviews = db.getData(`/movies/${req.params.id}`);
    const users = reviews.map(review =>
      db.getData(`/users/${review.userId}`)
    )
    res.json(populate(reviews, users))
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
