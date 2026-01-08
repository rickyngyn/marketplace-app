const express = require("express");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");
const listingRoutes = require("./routes/listings");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
