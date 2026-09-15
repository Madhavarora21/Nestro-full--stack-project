import CartModel from "../models/cart.models.js";
import ProductModel from "../models/product.model.js";
import OrderModel from "../models/order.model.js";
import {
  sendBadRequest,
  sendNotFound,
  sendServerError,
  sendSuccess,
} from "../utils/response.js";

const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      firstName,
      lastName,
      address,
      city,
      state,
      pincode,
      phone,
      paymentMethod,
    } = req.body;

    // Validate payment method
    if (!["ONLINE", "COD"].includes(paymentMethod)) {
      return sendBadRequest(res, "Invalid payment method");
    }

    // Get user's cart
    const cart = await CartModel.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return sendBadRequest(res, "Your cart is empty");
    }

    // Get products from database
    const productIds = cart.items.map((item) => item.productId);

    const products = await ProductModel.find({
      _id: { $in: productIds },
      status: true,
    });

    if (products.length !== cart.items.length) {
      return sendBadRequest(res, "Some products are no longer available");
    }

    // Create order items using actual salePrice
    const orderItems = cart.items.map((cartItem) => {
      const product = products.find(
        (p) => p._id.toString() === cartItem.productId.toString()
      );

      return {
        productId: product._id,
        qty: cartItem.qty,
        price: product.salePrice,
      };
    });

    // Calculate subtotal
    const subtotal = orderItems.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );

    const deliveryCharge = 0;
    const discount = 0;

    const totalAmount = subtotal + deliveryCharge - discount;

    // Generate demo order ID
    const orderId = `NESTRO-${Date.now()}`;

    // Create order
    const order = await OrderModel.create({
      userId,
      items: orderItems,

      shippingAddress: {
        firstName,
        lastName,
        address,
        city,
        state,
        pincode,
        phone,
      },

      paymentMethod,

      // Online payment is DEMO payment
      paymentStatus: paymentMethod === "ONLINE" ? "PAID" : "PENDING",

      orderStatus: "PLACED",

      subtotal,
      deliveryCharge,
      discount,
      totalAmount,

      orderId,
    });

    // Clear cart after successful order
    cart.items = [];
    await cart.save();

    return sendSuccess(res, "Order placed successfully", {
      orderId: order.orderId,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      totalAmount: order.totalAmount,
    });
  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);
    return sendServerError(res, "Internal Server Error");
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await OrderModel.find({ userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.productId",
        select: "name thumbnail",
      });

    return sendSuccess(res, "Orders fetched successfully", { orders });
  } catch (error) {
    console.log("GET MY ORDERS ERROR:", error);
    return sendServerError(res, "Internal Server Error");
  }
};

export { placeOrder, getMyOrders };