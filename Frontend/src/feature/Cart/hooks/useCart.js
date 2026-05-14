import { addItem } from "../service/cart.api.js";
import { useDispatch } from "react-redux";
import { addItems } from "../states/cart.slice.js";

export const useCart = () => {
  const dispatch = useDispatch();

  async function handleAdditem({ productId, variantId, quantity = 1 }) {
    try {
      const data = await addItem({ productId, variantId, quantity });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    handleAdditem,
  };
};
