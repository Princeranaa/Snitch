import "./App.css";
import { RouterProvider } from "react-router";
import { routes } from "./app.route";
import { useSelector } from "react-redux";
import { useAuth } from "../feature/hooks/useAuth";
import { useEffect } from "react";

function App() {
  const { handlegetMe } = useAuth();

  const user = useSelector((state) => state.auth.user);
  console.log(user);

  useEffect(() => {
    handlegetMe();
  }, []);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
