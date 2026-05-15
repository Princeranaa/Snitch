import axios from "axios";

const productAPi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const createProduct = async (formData) => {
  const response = await productAPi.post("/create/products", formData);
  return response.data;
};

export const getsellerProduct = async () => {
  const response = await productAPi.get("/products/seller");
  console.log("response", response);
  return response.data;
};

export const getAllProducts = async () => {
  const response = await productAPi.get("/products");
  return response.data;
};

export const getProductDetails = async (productId) => {
  const response = await productAPi.get(`/details/${productId}`);
  return response.data;
};

export const addProductVariant = async (productId, newProductVariant) => {
  const formData = new FormData();

  newProductVariant.images.forEach((image) => {
    formData.append("images", image.file);
  });

  formData.append("stock", newProductVariant.stock);
  formData.append("priceamount", newProductVariant.priceAmount);
  formData.append("priceCurrency", newProductVariant.priceCurrency);
  formData.append("attributes", JSON.stringify(newProductVariant.attributes));
  
  const response = await productAPi.post(`/${productId}/variants`, formData);
  return response.data;
};

  