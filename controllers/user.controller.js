const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid/v4");
const {
  randomCode,
  uploadImage,
  picturePin,
} = require("../config/constant");

function createAdmin(req, res) {
  let pin = randomCode();
  let pass = "123456";

  bcryptjs.genSalt(10, function (err, salt) {
    bcryptjs.hash(pass, salt, function (err, hashedPassword) {
      if (err) {
        return res.status(500).json({
          message: "Error hashing password",
        });
      }

      const user = {
        name: "super admin",
        email: "admin@gmail.com",
        phone: "07066492821",
        role: "Admin",
        image: uuidv4(),
        secret: pin,
        password: hashedPassword,
      };

      models.User.create(user)
        .then((result) => {
          res.status(200).json({
            message: "Admin created Successfully",
            success: true,
            staff: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Something went wrong..",
          });
        });
    });
  });
}

   
function createUser(req, res) {
  let pin = randomCode();

  if (req.body.email === "" || req.body.name === "" || req.body.phone === "") {
    return res.status(500).json({
      message: "All fields are required..!",
    });
  }

  models.User.findOne({
    where: { email: req.body.email },
  })
    .then((result) => {
      if (result) {
        return res.status(500).json({
          message: "Email already exists!",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          if (err) {
            return res.status(500).json({
              message: "Error generating salt",
            });
          }

          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            if (err) {
              return res.status(500).json({
                message: "Error hashing password",
              });
            }

            const user = {
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              role: "Admin",
              image: uuidv4(),
              secret: pin,
              password: hash,
            };

            models.User.create(user)
              .then((result) => {
                return res.status(200).json({
                  message: "User created successfully",
                  success: true,
                  staff: result,
                });
              })
              .catch((error) => {
                return res.status(500).json({
                  message: "Error creating user",
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function login(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(200).json({
          message: "Invalid email or password.",
        });
      }

      bcryptjs.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          return res.status(500).json({
            message: "Something went wrong while comparing passwords.",
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              id:user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              role: user.role,
              image: user.image,
              verified: user.verified,
              passSecret: user.passSecret,
              secret: user.secret,
            },
            process.env.JWT_SECRET, // Use your own JWT secret key here
            { expiresIn: "1h" } // Move expiresIn option to the same level as the JWT secret key
          );

          return res.status(200).json({
            success: true,
            message: "Authentication successful!",
            token: token,
            user: user,
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Invalid credentials!",
          });
        }
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
}
function byToken(req, res) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ADMIN);

    models.User.findByPk(decodedToken.adminId)
      .then((result) => {
        if (result) {
          //   result.image = getBase64("uploads/pictures/" + result.image);
          res.status(200).json({ admin: result, success: true });
        } else {
          res.status(404).json({
            message: "admin not found",
            success: false,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "something went wrong!",
        });
      });
  } else {
    res.json({ message: "invalid token" });
  }
}
function show(req, res) {
  const id = req.params.id;
  models.User.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json({ user: result, success: true });
      } else {
        res.status(404).json({
          message: "user not found",
          success: false,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong!",
      });
    });
}

function index(req, res) {
  models.User.findAll()
    .then((result) => {
      res.status(200).json({success: true,
        data: result,
        message: "users found successfully"});
    })
    .catch((error) => {
      res.status(500).json({
        message: error ?? `Something went wrong..`,
      });
    });
}
function uploadPic(req, res) {
  let imagePin = picturePin();
  // get base64 picture, decode and save to directory, change body.picture to given name and save
  let imageData = req.body.image;
  let extension = imageData.includes("data:image/png") ? ".png" : ".jpg";
  let imageName = "Staff" + "_" + imagePin + "_" + extension;
  // Save image here
  uploadImage({ data: imageData, filename: imageName });
  // new image name
  const id = req.params.id;
  req.body.image = imageName;

  models.User.update({ image: req.body.image }, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Profile picture uploaded..!",
        post: result,
        success: true,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
        success: false,
      });
    });
}
function update(req, res) {
  const id = req.params.id;
  const updatedAdmin = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  models.User.update(updatedAdmin, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Staff updated successfully",
        updatedAdmin,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong",
        error: error,
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;

  models.User.destroy({ where: { id: id } })
    .then((result) => {
      if (result > 0) {
        // Check if any rows were affected (user deleted)
        res.status(200).json({
          message: "User deleted successfully",
        });
      } else {
        // No rows affected, user with the specified ID not found
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong",
        error: error.message, // Provide more information about the error
      });
    });
}

module.exports = {
  createAdmin: createAdmin,
  createUser: createUser,
  login: login,
  index: index,
  show: show,
  byToken: byToken,
  uploadPic: uploadPic,
  update: update,
  destroy: destroy,
};
