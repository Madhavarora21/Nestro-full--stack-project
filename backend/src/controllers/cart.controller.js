
import CartModel from "../models/cart.models.js";
import { sendBadRequest, sendConflict, sendCreated, sendNotFound, sendServerError, sendSuccess } from "../utils/response.js"




const syncCart = async (req, res) => {
  try {
    const id = req.user._id;
    const { localcart } = req.body;

    const cart = JSON.parse(localcart);

    let userCart = await CartModel.findOne({ userId: id }).populate("productId",'_id salePrice originalPrice discount thumbnail')

    // If local cart is empty
    if (cart.length === 0) {
      return sendSuccess(res, "Cart Synced", userCart);
    }

    // If user has no cart in DB
    if (!userCart) {
      userCart = await CartModel.create({
        userId: id,
        items: cart.items
      });

      return sendSuccess(res, "Cart Synced Successfully", userCart);
    }

    // Merge local cart with DB cart
    cart.forEach((localItem) => {
      const existingItem = userCart.items.find(
        (item) =>
          item.productId.toString() === localItem.productId.toString()
      );

      if (existingItem) {
        existingItem.qty += localItem.qty;
      } else {
        userCart.items.push(localItem);
      }
    });

    await userCart.save();

    return sendSuccess(res, "Cart Synced Successfully", userCart);
  } catch (error) {
    console.log(error);
    sendServerError(res, "Internal Server Error");
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, qty } = req.body;

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = await CartModel.create({
        userId,
        items: [
            {
                 productId, qty
                 }
                ]
      });

      return res.status(200).json({
        message: "product added",
        cart
      })


    }
        const existingItem = cart.items.find(
            items =>
                item.productId.toString
        )
    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (item) {
      item.qty += qty;
    } else {
      cart.items.push({ productId, qty });
    }

    await cart.save();

    return sendSuccess(res, "Product added to cart", cart);
  } catch (error) {
    console.log(error);
    sendServerError(res, "Internal Server Error");
  }
};


const removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return sendNotFound(res, "Cart not found");
        }

        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== productId
        );

        await cart.save();

        return sendSuccess(res, "Product removed successfully", cart);
    } catch (error) {
        console.log(error);
        sendServerError(res, "Internal Server Error");
    }
};

const qty = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, action } = req.body;

        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return sendNotFound(res, "Cart not found");
        }

        const item = cart.items.find(
            (item) => item.productId.toString() === productId
        );

        if (!item) {
            return sendNotFound(res, "Product not found");
        }

        if (action === "inc") {
            item.qty += 1;
        } else if (action === "dec") {
            if (item.qty > 1) {
                item.qty -= 1;
            } else {
                cart.items = cart.items.filter(
                    (item) => item.productId.toString() !== productId
                );
            }
        } else {
            return sendBadRequest(res, "Invalid action");
        }

        await cart.save();

        return sendSuccess(res, "Quantity updated", cart);
    } catch (error) {
        console.log(error);
        sendServerError(res, "Internal Server Error");
    }
};


    

export {
    syncCart,
    addToCart,
    removeFromCart,
    qty 
  
}