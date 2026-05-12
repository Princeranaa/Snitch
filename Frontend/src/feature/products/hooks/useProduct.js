import {
  createProduct,
  getAllProducts,
  getProductDetails,
  getsellerProduct,
} from "../services/product.api";
import { useDispatch } from "react-redux";
import { sellerProduct, setProducts } from "../state/product.slice";

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

  async function handleGetAllProduct() {
    try {
      const data = await getAllProducts();
      dispatch(setProducts(data.products));
      return data.products;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetProductDetails(productId) {
    try {
      const data = await getProductDetails(productId);
      return data.product;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    handleCreateProduct,
    handleGetProduct,
    handleGetAllProduct,
    handleGetProductDetails,
  };
};
