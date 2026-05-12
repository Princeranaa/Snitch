import { createBrowserRouter } from "react-router";
import Register from "../feature/pages/Register";
import Login from "../feature/pages/Login";
import CreateProduct from "../feature/products/pages/createProduct";
import Dashboard from "../feature/products/pages/Dashboard";
import Protected from "../feature/auth/components/Protected";
import Home from "../feature/products/pages/Home";
import Productdetails from "../feature/products/pages/Productdetails";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
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
    path: "/products/:productId",
    element: <Productdetails />,
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
