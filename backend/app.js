const express = require("express");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");
const listingRoutes = require("./routes/listings");
const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigin =
  process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
  }),
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
