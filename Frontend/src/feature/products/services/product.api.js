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
