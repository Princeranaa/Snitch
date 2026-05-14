import { ProductModel } from "../models/Product.model.js";

export const stockVariant = (productId, variantId)=> {
  const product = ProductModel.findOne({
    _id: productId,
    "variants._id": variantId
  })

  const stock = product.variants.find((variant)=> variant._id.toString() === variantId).stock;
  return stock
}