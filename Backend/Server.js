const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/book", bookRoutes);

const PORT = process.env.PORT || 2999;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
