import { createProduct, getsellerProduct } from "../services/product.api";
import { useDispatch } from "react-redux";
import { sellerProduct } from "../state/product.slice";

export const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    try {
      const data = await createProduct(formData);
      return data.products;
    } catch (error) {
      console.log("something went wrong", error);
    }
  }

  async function handleGetProduct() {
    try {
      const data = await getsellerProduct();
      dispatch(sellerProduct(data.products));
      return data.products;
    } catch (error) {
      console.log("something went wrong", error);
    }
  }

  return {
    handleCreateProduct,
    handleGetProduct,
  };
};
