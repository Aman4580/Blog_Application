const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./database/db");
const userRoutes = require("./routes/route");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

database();

const PORT = 4000;

app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
