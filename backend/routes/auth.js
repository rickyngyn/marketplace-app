const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const pool = new Pool();

router.post("/register", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase();
    const exists = await pool.query("SELECT * FROM users WHERE email = $1", [
      normalizedEmail,
    ]);
    if (exists.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const results = await pool.query(
      "INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name",
      [normalizedEmail, passwordHash, first_name, last_name]
    );

    const token = jwt.sign(
      { userId: results.rows[0].id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      token,
      user: {
        id: results.rows[0].id,
        email: results.rows[0].email,
        first_name: results.rows[0].first_name,
        last_name: results.rows[0].last_name,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [normalizedEmail]
    );
    if (existingUser.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = existingUser.rows[0];

    if (!user.is_active) {
      return res.status(400).json({ message: "Account is disabled" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
