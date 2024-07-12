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
const portalRoute = require("./routes/portal");
const approvedRoute = require("./routes/approved");
const { endPoint } = require("./config/constant");
const rateLimit = require('express-rate-limit');
const { createAdmin } = require("./controllers/user.controller");


app.set('trust proxy', 1);
// List of IPs to be exempt from rate limiting
const exemptIPs = ['192.168.203.217', "197.210.53.195", "10.101.15.214"]; // Add the IPs that you want to exclude

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes 
  max: 15, // limit each IP to 20 requests per windowMs
  message: "Too many requests from this IP, please try again after a minute",
  headers: true, // include rate limit info in the response headers
  skip: (req, res) => {
    return exemptIPs.includes(req.ip);
  }
});
app.use(limiter);


// Define your allowed origins
const allowedOrigins = [
  "http://localhost:3002",
  "https://www.jigawaworkeragricsupportschemes.com",
  "https://jigawaworkeragricsupportschemes.com"
];

// Configure CORS options
let corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is in the allowedOrigins array
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,

};

// Use CORS middleware with the configured options
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
app.use(endPoint + "portal", portalRoute);
app.use(endPoint + "approved", approvedRoute);

// Server listen
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
