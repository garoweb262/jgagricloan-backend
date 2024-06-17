require("dotenv").config();
const express = require("express");
const Sequelize = require("sequelize");
const { sequelize } = require("./models");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const staffRoute = require("./routes/staff");
const applyRoute = require("./routes/apply");
const { endPoint } = require("./config/constant");

let corsOptions = {
  origin: "http://localhost:3002", // Update to your frontend origin
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use the configured CORS options

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());

// Static file serving
app.use("/public", express.static("public"));
app.use("/uploads/", express.static("uploads/"));

// Database connectivity check
app.get("/ping", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    res.json({
      success: true,
      message: "Server Running",
      database: "Database connection established successfully",
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: "Database connection failed",
    });
  }
});

// Routes
app.use(endPoint + "auth", authRoute);
app.use(endPoint + "staff", staffRoute);
app.use(endPoint + "apply", applyRoute);

// Server listen
const port = process.env.APP_PORT || 5009;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
