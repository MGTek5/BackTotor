const router = require("express").Router();
const { db } = require("../db");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const id = v4();
  const { username, password, email, profilePic } = req.body;
  const user = await db.push(`/users/${id}`, {
    id,
    username,
    password: bcrypt.hashSync(password, 12),
    email,
    profilePic,
  });
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const user = await db.get(`/users/${req.params.id}`);
  res.json(user);
});

module.exports = router;
