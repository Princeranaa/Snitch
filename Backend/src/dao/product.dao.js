import { ProductModel } from "../models/Product.model.js";

export const stockVariant = async (productId, variantId)=> {
  const product = await ProductModel.findOne({
    _id: productId,
    "variants._id": variantId
  })

  const stock = product.variants.find((variant)=> variant._id.toString() === variantId).stock;
  return stock
}