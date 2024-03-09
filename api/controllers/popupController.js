const popupModel = require("../models/popupModel");


// Insert Popup Data
exports.popup = async (req, res) => {
    try {
        const popup = await new popupModel({ ...req.body }).save();
        return res.status(201).json({
            success: true,
            message: "Data collected",
            popup
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while inserting popup data",
            error
        })
    }
}




// Get all popup Data
exports.getPopups = async (req, res) => {
    try {
        const popups = await popupModel.find({});
        return res.status(200).json({
            success: true,
            message: "Getting all popups",
            popups
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting popups",
            error
        })
    }
}