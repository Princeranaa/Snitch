import axios from "axios";
import { CarTaxiFront } from "lucide-react";

const cartApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/cart/",
  withCredentials: true,
});

export const addItem = async ({ productId, variantId, quantity = 1 }) => {
  if (!productId) throw new Error("Product id is missing");
  if (!variantId) throw new Error("Variant id is missing");

  const response = await cartApiInstance.post(
    `/add/${productId}/${variantId}`,
    { quantity },
  );
  return response.data;
};
