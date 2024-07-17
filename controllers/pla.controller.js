const models = require("../models");

function create(req, res) {
    models.Pla.findOne({
        where: { plaNumber: req.body.pla },
    }).then((result) => {
        if (result) {
            res.status(200).json({
                message: "Staff already exists!",
            });
        } else {
            const staff = {
                fullname: req.body.fullname,
                plaNumber: req.body.plaNumber,
                designation: req.body.designation,
                portfolio: req.body.portfolio,
                cropType: "Rice",
                farmSize: req.body.farmSize,
                phoneNumber: req.body.phoneNumber,
                farmLga: req.body.farmLga,
                issueDate: new Date(),
            };
            models.Pla.create(staff)
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
        const existingStaff = await models.Pla.findAll({
            where: {
                plaNumber: staffList.map(staff => staff.plaNumber),
            },
        });

        const existingPsnSet = new Set(existingStaff.map(staff => staff.plaNumber));
        const duplicateStaff = staffList.filter(staff => existingPsnSet.has(staff.plaNumber));

        if (duplicateStaff.length > 0) {
            return res.status(400).json({
                message: 'Some staff records already exist.',
                duplicates: duplicateStaff,
            });
        }

        // If no duplicates are found, create new staff records
        await models.Pla.bulkCreate(staffList);

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
    models.Pla.findByPk(id)
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
} const getByPla = async (req, res) => {
    try {
        const pla = req.params.pla;

        // // Check if an application already exists with the given psn
        // const existingApplication = await models.Application.findOne({ where: { psn } });
        // if (existingApplication) {
        //     return res.status(400).json({
        //         message: 'Application with this PSN Does Not exists.',
        //         success: false,
        //     });
        // }

        // If no existing application is found, proceed to find the staff data
        const staff = await models.Pla.findOne({ where: { plaNumber: pla } });
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
    models.Pla.findAll()
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
        plaNumber: req.body.pla,
        ipps_id: req.body.ipps_id,
        mda: req.body.mda,
        bank: req.body.bank,
        accountNo: req.body.accountNo,
        bvn: req.body.bvn,
        gradeLevel: req.body.gradeLevel,
    };

    models.Pla.update(updatedDept, { where: { id: id } })
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

function updateDisbursement(req, res) {
    const pla = req.params.pla;
    const status = req.body.disbursement;

    models.Pla.update({ disbursement: status }, { where: { plaNumer: pla } })
        .then((result) => {
            res.status(200).json({
                success: true,
                data: result,
                message: "Disbursement status updated successfully",
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

    models.Pla.destroy({ where: { id: id } })
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
    getByPla: getByPla,
    getById: getById,
    updateDisbursement: updateDisbursement,
    update: update,
    destroy: destroy,
};
