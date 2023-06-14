const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth/auth.routes");

const app = express();

app.use(express.json({ limit: "100mb" }));

app.use(cors());

app.use("/api/auth", authRoutes);

module.exports = app;
