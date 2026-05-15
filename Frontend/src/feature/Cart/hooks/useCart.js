import { addItem, getItems, incrementCart } from "../service/cart.api.js";
import { useDispatch } from "react-redux";
import { addItems, incrementCartItem, setItems } from "../states/cart.slice.js";

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

  async function handleGetItems() {
    try {
      const data = await getItems();
      dispatch(setItems(data.cart.items));
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleIncrementCartAPI({ productId, variantId }) {
    try {
      const data = await incrementCart({ productId, variantId });
      console.log("data", data)
      dispatch(incrementCartItem({ productId, variantId }));
    } catch (error) {
      console.log(error);
    }
  }

  return {
    handleAdditem,
    handleGetItems,
    handleIncrementCartAPI,
  };
};
