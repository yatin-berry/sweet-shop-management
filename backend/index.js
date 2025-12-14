require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/sweets", require("./routes/sweetRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));


app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on " + PORT);
});





