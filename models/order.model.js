const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    phone_number: {
      type: String,
      required: true,
    },
    order_date: {
      type: Date,
      required: true,
    },
    delivery_date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    order_status: {
      type: String,
      required: true,
    },
    order_address:{
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    payment_id:{
      type: String,
      required: true,
    },
    payment_url: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
      default: false,
    },
    employee_id: {
      type: String,
      required: true,
      default: "Chưa có",
    },
    product_list: [
      {
        product_id: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          // Giá của 1 sản phẩm chưa giảm giá
          type: Number,
          required: true,
        },
        discount_price: {
          // Giá của 1 sản phẩm đã giảm giá
          type: Number,
          required: true,
        },
        quantity: {
          
          type: Number,
          required: true,
        },
      },
    ],
    voucher_id: {
      type: [String],
      required: true,
      default: []
    },
    total_price: {  
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// orderSchema.pre('save', function (next) {
//   const offset = 7 * 60 * 60 * 1000; // GMT+7 offset in milliseconds
//   this.createdAt = new Date(this.createdAt.getTime() + offset);
//   next();
// });

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order ;