const models = require("../models");

function create(req, res) {
  models.Staff.findOne({
    where: { psn: req.body.psn },
  }).then((result) => {
    if (result) {
      res.status(200).json({
        message: "Staff already exists!",
      });
    } else {
      const staff = {
        fullname: req.body.fullname,
        psn: req.body.psn,
        ipps_id: req.body.ipps_id,
        mda: req.body.mda,
        bank: req.body.bank,
        accountNo: req.body.accountNo,
        bvn: req.body.bvn,
        gradeLevel: req.body.gradeLevel,
      };
      models.Staff.create(staff)
        .then((result) => {
          res.status(200).json({
            message: "employee created Successfully",
            success: true,
            data: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: error ?? `Something went wrong..`,
          });
        });
    }
  });
}

const uploadStaff = async (req, res) => {
    try {
      const staffList = req.body.staff;
  
      if (!Array.isArray(staffList)) {
        return res.status(400).json({ message: 'Invalid data format. Expected an array of staff records.' });
      }
  
      // Find existing staff by PSN
      const existingStaff = await models.Staff.findAll({
        where: {
          psn: staffList.map(staff => staff.psn),
        },
      });
  
      const existingPsnSet = new Set(existingStaff.map(staff => staff.psn));
      const duplicateStaff = staffList.filter(staff => existingPsnSet.has(staff.psn));
  
      if (duplicateStaff.length > 0) {
        return res.status(400).json({
          message: 'Some staff records already exist.',
          duplicates: duplicateStaff,
        });
      }
  
      // If no duplicates are found, create new staff records
      await models.Staff.bulkCreate(staffList);
  
      res.status(200).json({
        message: `Processed ${staffList.length} records. ${staffList.length} new staff added.`,
        success: true,
        data: staffList,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  };
  
  

function getById(req, res) {
  const id = req.params.id;
  models.Staff.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json({ data: result, success: true });
      } else {
        res.status(404).json({
          message: "Employee not found",
          success: false,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error ?? `Something went wrong..`,
      });
    });
}const getByPsn = async (req, res) => {
  try {
    const psn = req.params.psn;

    // Check if an application already exists with the given psn
    const existingApplication = await models.Application.findOne({ where: { psn } });
    if (existingApplication) {
      return res.status(400).json({
        message: 'Application with this PSN already exists.',
        success: false,
      });
    }

    // If no existing application is found, proceed to find the staff data
    const staff = await models.Staff.findOne({ where: { psn } });
    if (staff) {
      res.status(200).json({ data: staff, message: "Employee Found", success: true });
    } else {
      res.status(404).json({
        message: "Employee not found",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message ?? "Something went wrong.",
    });
  }
};


function index(req, res) {
  models.Staff.findAll()
    .then((result) => {
      res
        .status(200)
        .json({
          success: true,
          data: result,
          message: "Employee found successfully",
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
    ipps_id: req.body.ipps_id,
    mda: req.body.mda,
    bank: req.body.bank,
    accountNo: req.body.accountNo,
    bvn: req.body.bvn,
    gradeLevel: req.body.gradeLevel,
  };

  models.Staff.update(updatedDept, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
        message: "Employee updated successfully",
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

  models.Staff.destroy({ where: { id: id } })
    .then((result) => {
      if (result > 0) {
        // Check if any rows were affected (user deleted)
        res.status(200).json({
          message: "Employee deleted successfully",
        });
      } else {
        // No rows affected, user with the specified ID not found
        res.status(404).json({
          message: "Employee not found",
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
  uploadStaff: uploadStaff,
  index: index,
  getByPsn:getByPsn,
  getById: getById,
  update: update,
  destroy: destroy,
};
