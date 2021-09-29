const router = require("express").Router();
const { db } = require("../db");


router.get("/:id", async (req, res) => {
  const user = await db.get(`/users/${req.params.id}`);
  res.json(user);
});

module.exports = router;
