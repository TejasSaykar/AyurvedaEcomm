const newsletterModel = require("../models/newsletterModel");

exports.newsletter = async (req, res) => {
  const { email } = req.body;
  try {
    const newsletter = await new newsletterModel({ email }).save();
    return res.status(201).json({
      success: true,
      message: "Subscribe to the newsletter",
      newsletter,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while subscribe the newsletter",
      error,
    });
  }
};

// Get all newsletters
exports.getNewsletters = async (req, res) => {
  try {
    const newsletters = await newsletterModel.find({});
    return res.status(200).json({
      success: true,
      message: "Getting all newsletters",
      newsletters,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the all newsletters",
      error,
    });
  }
};
