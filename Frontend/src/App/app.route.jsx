import { createBrowserRouter } from "react-router";
import Register from "../feature/pages/Register";
import Login from "../feature/pages/Login";
import CreateProduct from "../feature/products/pages/createProduct";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>hello here</h1>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/seller/create-product",
    element: <CreateProduct />,
  },
]);
