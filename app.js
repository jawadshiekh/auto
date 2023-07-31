const express = require("express");
const cors = require("cors");
const bikeRoutes = require("./routes/bike/bike.routes");
const jetRoutes = require("./routes/jet/jet.routes");

const app = express();

app.use(express.json({ limit: "100mb" }));

app.use(cors());

app.get("/api", (req, res) => {
  res.status(200).json({ message: "ok" });
});
app.use("/api/bike", bikeRoutes);
app.use("/api/jet", jetRoutes);



module.exports = app;
