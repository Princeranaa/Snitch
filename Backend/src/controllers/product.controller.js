import { ProductModel } from "../models/Product.model.js";
import { uploadFile } from "../services/Storage.service.js";

export const createproduct = async (req, res) => {
  const { title, description, price, priceamount, priceCurrency } = req.body;
  const seller = req.user;

  try {
    const images = await Promise.all(
      req.files.map(async (file) => {
        const url = await uploadFile(file.buffer, file.originalname);

        return {
          url,
        };
      }),
    );

    const product = await ProductModel.create({
      title,
      description,
      seller,
      price: {
        amount: priceamount,
        currency: priceCurrency,
      },
      images,
      seller: seller._id,
    });

    res.status(201).json({
      message: "product create succesfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSellerProducts = async (req, res) => {
  const seller = req.user;
  try {
    const products = await ProductModel.find({ seller: seller._id }).select(
      "-__v",
    );

    res.status(200).json({
      message: "seller products fetched successfully",
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  const products = await ProductModel.find();

  res.status(200).json({
    message: "products fetched successfully",
    success: true,
    products,
  });
};

export const getProductDetails = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id)

  if (!product) {
    return res
      .status(404)
      .json({ message: "product not found", status: false });
  }

  res.status(200).json({
    message: "product fetched successfully",
    success: true,
    product,
  });
};
