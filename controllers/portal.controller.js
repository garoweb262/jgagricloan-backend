const models = require("../models");const moment = require('moment');

// Helper function to parse the request body and convert date strings to Unix timestamps
// function parseRequestBody(req) {
//   const open = req.body.open;
//   const openTimeString = req.body.openTime;
//   const closeTimeString = req.body.closeTime;

//   // Parse date strings using moment.js without converting to Unix timestamps
//   const openTime = moment(openTimeString, "D MMMM, YYYY h:mmA").unix();
//   const closeTime = moment(closeTimeString, "D MMMM, YYYY h:mmA").unix();

//   return {
//     open: open,
//     openTime: openTime,
//     closeTime: closeTime
//   };
// }

function createOrUpdate(req, res) {
  try {

    const staff = {
     open:req.body.open,
  openTime:req.body.openTime,
  closeTime: req.body.closeTime
    }
// console.log(staff);
    // Check if there is an existing entry in the database
    models.Portal.findOne()
      .then(existingEntry => {
        if (existingEntry) {
          // If an entry exists, update it
          return models.Portal.update(staff, { where: { id: existingEntry.id } })
            .then(() => {
              res.status(200).json({
                success: true,
                message: "Portal opening time updated",
                data: staff,
              });
            });
        } else {
          // If no entry exists, create a new one
          return models.Portal.create(staff)
            .then(result => {
              res.status(200).json({
                success: true,
                message: "Portal opening time created",
                data: result,
              });
            });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: error.message ?? `Something went wrong..`,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: error.message ?? `Something went wrong..`,
    });
  }
}
function getById(req, res) {
  const id = req.params.id;
  models.Portal.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json({ data: result, success: true });
      } else {
        res.status(404).json({
          message: "Portal Settings not found",
          success: false,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error ?? `Something went wrong..`,
      });
    });
}
module.exports = {
  createOrUpdate,
  getById:getById,
};
