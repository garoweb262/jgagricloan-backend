const models = require("../models");
const statistics = async(req, res) => {
    try {
      const [staffCount, applicationCount] = await Promise.all([
        models.Staff.count(),
        models.Application.count()
      ]);
  
      res.status(200).json({
        success: true,
        message: "statistics fetched successfull",
        totalStaff: staffCount,
        totalApplications: applicationCount
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Something went wrong.',
      });
    }
  }
  module.exports = {
    statistics:statistics
  };