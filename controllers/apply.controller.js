const models = require("../models");

async function create(req, res) {
  try {
      const { psn } = req.body;

      // Check if an application already exists with the given psn
      const existingApplication = await models.Application.findOne({ where: { psn } });
      if (existingApplication) {
          return res.status(400).json({
              message: 'Application with this PSN already exists.',
              success: false,
          });
      }

      // If no existing application found, proceed to create a new one
      const apply = {
          fullname: req.body.fullname,
          psn: req.body.psn,
          gradeLevel: req.body.gradeLevel,
          phone: req.body.phone,
          email: req.body.email,
          nin: req.body.nin,
          bvn: req.body.bvn,
          bank: req.body.bank,
          accountNo: req.body.accountNo,
          mda: req.body.mda,
          gender: req.body.gender,
          appointmentType: req.body.appointmentType,
          cropType: req.body.cropType,
          lga: req.body.lga,
          farmLoc: req.body.farmLoc,
          farmLga: req.body.farmLga,
          farmWard: req.body.farmWard,
          community: req.body.community,
          cordinate: req.body.cordinate,
          consent: req.body.consent,
      };

      // Create the new application
      const applyResult = await models.Application.create(apply);

      res.status(200).json({
          message: 'Application submitted successfully',
          success: true,
          inputData: apply,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: error.message || 'Something went wrong.',
      });
  }
}

  

function getById(req, res) {
  const id = req.params.id;
  models.Application.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json({ data: result, success: true });
      } else {
        res.status(404).json({
          message: "Application not found",
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
function getByPsn(req, res) {
  const psn = req.params.psn;
  models.Application.findOne({ where: { psn: psn } })
    .then((result) => {
      if (result) {
        res.status(200).json({ data: result, success: true });
      } else {
        res.status(404).json({
          message: "Application not found",
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
function index(req, res) {
  models.Application.findAll()
    .then((result) => {
      res
        .status(200)
        .json({
          success: true,
          data: result,
          message: "Application found successfully",
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: error ?? `Something went wrong..`,
      });
    });
}

function update(req, res) {
  const id = req.params.id;
  const updatedDept = {
    fullname: req.body.fullname,
          psn: req.body.psn,
          gradeLevel: req.body.gradeLevel,
          phone: req.body.phone,
          email: req.body.email,
          nin: req.body.nin,
          bvn: req.body.bvn,
          bank: req.body.bank,
          accountNo: req.body.accountNo,
          mda: req.body.mda,
          gender: req.body.gender,
          appointmentType: req.body.appointmentType,
          cropType: req.body.cropType,
          lga: req.body.lga,
          farmLoc: req.body.farmLoc,
          farmLga: req.body.farmLga,
          farmWard: req.body.farmWard,
          community: req.body.community,
          cordinate: req.body.cordinate,
          consent: req.body.consent,
  };

  models.Application.update(updatedDept, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
        message: "Application updated successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error ?? `Something went wrong..`,
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;

  models.Application.destroy({ where: { id: id } })
    .then((result) => {
      if (result > 0) {
        // Check if any rows were affected (user deleted)
        res.status(200).json({
          message: "Application deleted successfully",
        });
      } else {
        // No rows affected, user with the specified ID not found
        res.status(404).json({
          message: "Application not found",
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: error ?? `Something went wrong..`,
      });
    });
}

  
module.exports = {
  create: create,
  index: index,
  getById: getById,
  getByPsn: getByPsn,
  update: update,
  destroy: destroy,
};
