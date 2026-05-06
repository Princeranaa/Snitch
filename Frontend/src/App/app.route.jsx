import { createBrowserRouter } from "react-router";
import Register from "../feature/pages/Register";
import Login from "../feature/pages/Login";

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
]);
