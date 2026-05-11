import axios from "axios";

const productAPi = axios.create({
  baseURL: "/",
  withCredentials: true,
});

export const createProduct = async (formData) => {
  const response = await productAPi.post("/create/products",formData)
  return response.data;
};

export const getsellerProduct = async () => {
  const response = await productAPi.get("/products/seller")
  return response.data;
};


