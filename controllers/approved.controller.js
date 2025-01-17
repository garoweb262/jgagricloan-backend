const models = require("../models");

function create(req, res) {
    models.Approved.findOne({
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
                mda: req.body.mda,
                bank: req.body.bank,
                accountNo: req.body.accountNo,
                bvn: req.body.bvn,
                gradeLevel: req.body.gradeLevel,
                cropType: req.body.cropType,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                nin: req.body.nin,
                lgaOrigin: req.body.lgaOrigin,
                farmLga: req.body.farmLga,
                farmLocation: req.body.farmLocation,
                issueDate: new Date(),
            };
            models.Approved.create(staff)
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
        const existingStaff = await models.Approved.findAll({
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
        await models.Approved.bulkCreate(staffList);

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
    models.Approved.findByPk(id)
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
} const getByPsn = async (req, res) => {
    try {
        const psn = req.params.psn;

        // // Check if an application already exists with the given psn
        // const existingApplication = await models.Application.findOne({ where: { psn } });
        // if (existingApplication) {
        //     return res.status(400).json({
        //         message: 'Application with this PSN Does Not exists.',
        //         success: false,
        //     });
        // }

        // If no existing application is found, proceed to find the staff data
        const staff = await models.Approved.findOne({ where: { psn } });
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
    models.Approved.findAll()
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

    models.Approved.update(updatedDept, { where: { id: id } })
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
    const psn = req.params.psn;
    const status = req.body.disbursement;

    models.Approved.update({ disbursement: status }, { where: { psn: psn } })
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

    models.Approved.destroy({ where: { id: id } })
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
    getByPsn: getByPsn,
    getById: getById,
    updateDisbursement: updateDisbursement,
    update: update,
    destroy: destroy,
};
