import { createBrowserRouter } from "react-router";
import Register from "../feature/pages/Register";
import Login from "../feature/pages/Login";
import CreateProduct from "../feature/products/pages/createProduct";
import Dashboard from "../feature/products/pages/Dashboard";
import Protected from "../feature/auth/components/Protected";

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
    element: <Protected role="seller"><CreateProduct /></Protected>,
  },
  {
    path: "/seller/dashboard",
    element: <Protected role="seller"><Dashboard /></Protected>,
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>,
  },
]);
