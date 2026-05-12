import { setUser, setLoading, setError } from "../states/auth.slice";
import { register, login, getMe } from "../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  /* Register */
  async function handleRegister({
    email,
    password,
    fullname,
    contact,
    isSeller = false,
  }) {
    const data = await register({
      email,
      password,
      fullname,
      contact,
      isSeller,
    });
    dispatch(setUser(data.user));
    return data.user;
  }

  /* Login */
  async function handleLogin({ email, password }) {
    const data = await login({ email, password });
    dispatch(setUser(data.user));
    return data.user;
  }

  /* get me  */
  async function handlegetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      console.log("Error fetching user data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
    handleLogin,
    handlegetMe,
  };
};
