const { Pool } = require("pg");
const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

const pool = new Pool();

router.post("/", requireAuth, async (req, res) => {
  const { title, description, price } = req.body;
  const userId = req.userId;

  try {
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }
    if (price === undefined || price === null || Number.isNaN(Number(price))) {
      return res.status(400).json({ message: "Valid price is required" });
    }

    const results = await pool.query(
      "INSERT INTO listings (title, description, price, user_id) VALUES ($1, $2, $3, $4) RETURNING id, title, price, user_id",
      [title.trim(), description.trim() || null, Number(price), userId]
    );

    return res.status(201).json(results.rows[0]);
  } catch (err) {
    console.error("Create listing error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT listings.id, listings.title, listings.description, listings.price, listings.created_at, users.id AS user_id, users.first_name, users.last_name FROM listings JOIN users ON listings.user_id = users.id ORDER BY listings.created_at DESC"
    );
    return res.json(results.rows);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  const userId = req.userId;

  try {
    const results = await pool.query(
      "SELECT listings.id, listings.title, listings.description, listings.price, listings.created_at, users.id AS user_id, users.first_name, users.last_name FROM listings JOIN users ON listings.user_id = users.id WHERE listings.user_id = $1 ORDER BY listings.created_at DESC",
      [userId]
    );
    return res.json(results.rows);
  } catch (err) {
    console.error("Get my listings error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const results = await pool.query(
      "SELECT listings.id, listings.title, listings.description, listings.price, listings.created_at, users.id AS user_id, users.first_name, users.last_name FROM listings JOIN users ON listings.user_id = users.id WHERE listings.id = $1",
      [id]
    );
    if (results.rows.length === 0) {
      return res.status(400).json({ message: "Listing not found" });
    }
    return res.json(results.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  const user_id = req.userId;

  try {
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }
    if (price === undefined || price === null || Number.isNaN(Number(price))) {
      return res.status(400).json({ message: "Valid price is required" });
    }

    const results = await pool.query(
      "UPDATE listings SET title = COALESCE($1, title), description = COALESCE($2, description), price = COALESCE($3, price) WHERE id = $4 AND user_id = $5 RETURNING id, title, description, price, user_id, created_at",
      [title.trim(), description.trim() || null, Number(price), id, user_id]
    );
    if (results.rows.count === 0) {
      return res
        .status(400)
        .json({ message: "Listings not found or not yours" });
    }
    return res.json(results.rows[0]);
  } catch (err) {
    console.error("Update listing error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const results = await pool.query(
      "DELETE FROM listings WHERE id = $1 AND user_id = $2 RETURNING id, title",
      [id, userId]
    );
    if (results.rows.count === 0) {
      return res
        .status(400)
        .json({ message: "Listing not found or not yours" });
    }
    return res.json({ message: "Listing deleted" });
  } catch (err) {
    console.error("Delete listing error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
