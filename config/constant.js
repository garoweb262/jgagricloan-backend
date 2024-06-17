require("dotenv").config();
var nodemailer = require("nodemailer");

const constant = {
  endPoint: "/api/v1/",
  appName: "FUD Student ID Card Re-issued System",
  appEmail: "muhdgazzali01@gmail.com",
  appUrl: "http://localhost:5000",
  fAppUrl: "http://localhost:3000",

  picturePin(len = 4, bits = 16) {
    bits = bits || 36;
    var outStr = "",
      newStr;
    while (outStr.length < len) {
      newStr = Math.random().toString(bits).slice(2);
      outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length));
    }
    return outStr.toUpperCase();
  },
  randomPin: (length = 15) => {
    return Math.floor(
      Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
    );
  },
  randomCode(len = 12, bits = 16) {
    bits = bits || 36;
    var outStr = "",
      newStr;
    while (outStr.length < len) {
      newStr = Math.random().toString(bits).slice(2);
      outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length));
    }
    return outStr.toUpperCase();
  },
  passPin(len = 4, bits = 8) {
    bits = bits || 16;
    var outStr = "",
      newStr;
    while (outStr.length < len) {
      newStr = Math.random().toString(bits).slice(2);
      outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length));
    }
    return outStr.toUpperCase();
  },
 

  sendEMail: (
    email = "posventory@gmail.com",
    subject = `${constant.appName} Mail Subject`,
    message = "Welcome '<h1>1233121</h1>"
  ) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Defineing the mail
    var mailOptions = {
      from: "posventory@gmail.com",
      to: email,
      subject: subject,
      // text: 'That was easy!'
      html: message,
    };

    try {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (e) {
      console.log("FAILD TO SEND MAIL");
    }

    console.log(message);
    return true;
  },
  

};
module.exports = constant;