const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

exports.placeOrder = async (req, res) => {
    const { products, userId } = req.body;
    // console.log("Products : ", products)
    try {
        for (let product of products) {
            let productId = product._id
            let quantity = product.quantity;
            await productModel.updateOne({ _id: productId }, {
                $inc: { quantity: -quantity }
            });
        }
        const order = await new orderModel({
            products: products,
            ...req.body,
            buyer: userId
        }).save();

        // console.log("Place Oreder : ", newOrder)

        return res.status(200).json({
            success: true,
            message: "Order Placed",
            order
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while placing the order",
            error
        })
    }
}

// Get all Orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate("products").populate("buyer", "username").sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            totalOrders: orders.length,
            message: "Getting all Orders",
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting the orders",
            error
        })
    }
}



// Single User Orders
exports.singleOrder = async (req, res) => {
    const userId = req.params.id;
    try {
        const order = await orderModel.find({ buyer: userId })
            .populate("products")
            .populate("buyer", "username");

        return res.status(200).json({
            success: true,
            message: "Single order is getting",
            order
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting the single Order",
            error
        })
    }
}

// Update Order Status
exports.updateStatus = async (req, res) => {
    const orderId = req.params.id;
    const status = req.body.status;
    try {
        let orders;
        if (status === "Cancel") {
            orders = await orderModel.findById({ _id: orderId }).populate("products", "quantity");
            for (let product of orders.products) {
                let id = product._id;
                let prevProduct = await productModel.findById({ _id: id });
                let newQty = prevProduct.userQty;
                orders = await productModel.updateOne({ _id: id }, { $inc: { quantity: newQty } })
            }

        }
        const order = await orderModel.findByIdAndUpdate({ _id: orderId }, { $set: { ...req.body, status: status } }, { new: true }).populate("products");
        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while updating the order status",
            error
        })
    }
}


// Delete Order
exports.deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await orderModel.findByIdAndDelete({ _id: orderId },);
        return res.status(200).json({
            success: true,
            message: "Order deleted",
            order
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting the order",
            error
        })
    }
}