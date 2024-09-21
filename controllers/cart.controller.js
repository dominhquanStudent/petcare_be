const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
module.exports.updateCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  console.log(req.body);
  try {
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const cart = await Cart.findOne({ user_id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    let product_list = cart.product_list;
    const index = product_list.findIndex((product) => product.product_id === product_id);
    if (index !== -1) {
      if (quantity === "0") {
        product_list.splice(index, 1);
      }
      else {
        // Product exists in the cart, update the quantity
        product_list[index].quantity = quantity;
        product_list[index].price = product.price;
        product_list[index].discount_price = product.price * (1 - parseFloat(product.discount) / 100);
      }
    } else {
      // Product does not exist in the cart, add it
      if (quantity === "0") {
        return res.status(400).json({ error: "Quantity must be greater than 0" });
      } else {
        product_list.push({
          product_id: product_id,
          product_image: product.image.url[0], // Assuming product.image is the correct field
          quantity: quantity,
          price: product.price,
          discount_price: product.price * (1 - parseFloat(product.discount) / 100),
        });
      }
    }
    // Save the updated cart
    cart.product_list = product_list;
    await cart.save();

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: "Update Cart error" });
  }
};