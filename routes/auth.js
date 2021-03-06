const router = require("express").Router();
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../db");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const id = db.getData(`/users/${email}`);
    const user = db.getData(`/users/${id}`);

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(user, "thisistheway");
      res.json({
        token,
        user: {
          email,
          id,
          username: user.username,
          profilePic: user.profilePic,
        },
      });
    } else {
      throw "Wrong data";
    }
  } catch (error) {
    res.status(401).json({ status: "ko", message: "login failed" });
  }
});

router.post("/register", async (req, res) => {
  const id = v4();
  const { username, password, email, profilePic } = req.body;
  const user = {
    id,
    username,
    password: bcrypt.hashSync(password, 12),
    email,
    profilePic,
  };

  await db.push(`/users/${id}`, user);
  await db.push(`/users/${email}`, id);
  res.json(user);
});

module.exports = router;
