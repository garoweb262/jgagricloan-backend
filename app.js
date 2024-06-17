require("dotenv").config();
const express = require("express");
const Sequelize = require("sequelize");
const { sequelize } = require("./models");
const app = express();
var cors = require("cors");
// var cookie = require("cookie");
const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
// const path = require("path");
const authRoute = require("./routes/auth");
const staffRoute = require("./routes/staff");
const applyRoute = require("./routes/apply");
// const facultyRoute = require("./routes/faculty");
// const departmentRoute = require("./routes/department");
// const studentRoute = require("./routes/student");
// const reportRoute = require("./routes/report");
// const uploadRoute = require("./routes/upload");
const Op = Sequelize.Op;
let corsOptions = {
  origin: "http://localhost:5009",
};
app.use(cors());
const {
  endPoint,
} = require("./config/constant");

app.use(express.json({ limit: "50mb" }));
//body parser

app.use(bodyParser.json());

// cors

app.use("/public", express.static("public"));
app.use("/uploads/", express.static("uploads/"));

app.get("/ping", async (req, res) => {
  try {
    // Check database connection
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
const port = process.env.APP_PORT || 5009
// Routes
app.use(endPoint + "auth", authRoute);
app.use(endPoint + "staff", staffRoute);
app.use(endPoint + "apply", applyRoute);
// app.use(endPoint + "faculty", facultyRoute);
// app.use(endPoint + "department", departmentRoute);
// app.use(endPoint + "student", studentRoute);
// app.use(endPoint + "report", reportRoute);
// app.use(endPoint + "upload", uploadRoute);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
