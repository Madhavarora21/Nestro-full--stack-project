import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        qty: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    shippingAddress: {
      firstName: {
        type: String,
        required: true,
      },

      lastName: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },
    },

    paymentMethod: {
      type: String,
      enum: ["ONLINE", "COD"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },

    orderStatus: {
      type: String,
      enum: ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PLACED",
    },

    subtotal: {
      type: Number,
      required: true,
    },

    deliveryCharge: {
      type: Number,
      default: 0,
    },

            discount: {
            type: Number,
            default: 0,
        },

        purchaseProtection: {
            type: Boolean,
            default: false,
        },

        protectionCharge: {
            type: Number,
            default: 0,
        },

        totalAmount: {
      type: Number,
      required: true,
    },

    orderId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;