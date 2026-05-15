import { CartModel } from "../models/cart.model.js";
import { ProductModel } from "../models/Product.model.js";
import { stockVariant } from "../dao/product.dao.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, variantId } = req.params;
    const { quantity = 1 } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
        success: false,
      });
    }

    const product = await ProductModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product or variant not found",
        success: false,
      });
    }

    const stock = await stockVariant(productId, variantId);

    const cart =
      (await CartModel.findOne({ user: req.user._id })) ||
      (await CartModel.create({ user: req.user._id }));

    const isProductAlreadyInCart = cart.items.some(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    );

    if (isProductAlreadyInCart) {
      const quantityInCart = cart.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.variant?.toString() === variantId,
      ).quantity;

      if (quantityInCart + quantity > stock) {
        return res.status(400).json({
          message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
          success: false,
        });
      }

      await CartModel.findOneAndUpdate(
        {
          user: req.user._id,
          "items.product": productId,
          "items.variant": variantId,
        },
        {
          $inc: { "items.$.quantity": quantity },
        },
        {
          new: true,
        },
      );

      return res.status(200).json({
        message: "Cart updated successfully",
        success: true,
      });
    }

    if (quantity > stock) {
      return res.status(400).json({
        message: `Only ${stock} items left in stock`,
        success: false,
      });
    }

    cart.items.push({
      product: productId,
      variant: variantId,
      quantity,
      price: product.price,
    });

    await cart.save();

    return res.status(200).json({
      message: "Product added to cart successfully",
      success: true,
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    return res.status(500).json({
      message: "Something went wrong while adding product to cart",
      success: false,
    });
  }
};

export const getCart = async (req, res) => {
  const user = req.user._id;
  let cart = await CartModel.findOne({ user: user._id }).populate(
    "items.product",
  );

  if (!cart) {
    cart = await CartModel.create({ user: user._id });
  }

  return res.status(200).json({
    message: "Cart fetched successfully",
    success: true,
    cart,
  });
};

export const incrementCartQuantity = async (req, res) => {
  const { productId, variantId } = req.params;

  const product = await ProductModel.findOne({
    _id: productId,
    "variants._id": variantId,
  });

  if (!product) {
    return res.status(404).json({
      message: "Product or variant not found",
      success: false,
    });
  }

  const cart = await CartModel.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
      success: false,
    });
  }

  const stock = await stockVariant(productId, variantId);

  const itemQuantityInCart =
    cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    )?.quantity || 0;

  if (itemQuantityInCart + 1 > stock) {
    return res.status(400).json({
      message: `Only ${stock} items left in stock. and you already have ${itemQuantityInCart} items in your cart`,
      success: false,
    });
  }

  await CartModel.findOneAndUpdate(
    {
      user: req.user._id,
      "items.product": productId,
      "items.variant": variantId,
    },
    { $inc: { "items.$.quantity": 1 } },
    { new: true },
  );

  return res.status(200).json({
    message: "Cart item quantity incremented successfully",
    success: true,
  });
};
