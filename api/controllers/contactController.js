const contactModel = require("../models/contactModel");

exports.contact = async (req, res) => {
  try {
    const contact = await new contactModel({ ...req.body }).save();
    return res.status(201).json({
      success: true,
      message: "Message send",
      contact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while sending the message",
      error,
    });
  }
};
