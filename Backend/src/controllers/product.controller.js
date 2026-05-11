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
