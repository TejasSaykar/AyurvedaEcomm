const bannerModel = require("../models/bannerModel");

// Upload Banner Image
exports.uploadBanner = async (req, res) => {
    const { bannerImage } = req.body;
    try {
        const banner = await new bannerModel({ bannerImage }).save();
        return res.status(201).json({
            success: true,
            message: "Banner uploaded",
            banner
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while uploading the banner",
            error
        })
    }
}

// Get all Banners
exports.getBanners = async (req, res) => {
    try {
        const banners = await bannerModel.find({});
        return res.status(200).json({
            success: true,
            message: "Getting all Banners",
            banners
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting the banners",
            error
        })
    }
}


// Delete Banner
exports.deleteBanner = async (req, res) => {
    const bannerId = req.params.id;
    try {
        const banner = await bannerModel.findByIdAndDelete({ _id: bannerId });
        return res.status(200).json({
            success: true,
            message: "Banner deleted",
            banner
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting the banner",
            error
        })
    }
}