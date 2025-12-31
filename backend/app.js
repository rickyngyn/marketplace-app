const express = require("express");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");
const listingRoutes = require("./routes/listings");

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
