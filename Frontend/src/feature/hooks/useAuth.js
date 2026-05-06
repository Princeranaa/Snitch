import { setUser, setLoading, setError } from "../states/auth.slice";
import { register, login } from "../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  
  /* Register */
  async function handleRegister({ email, password, fullname, contact, isSeller = false }) {
    const data = await register({ email, password, fullname, contact, isSeller});
    dispatch(setUser(data.user));
  }

   /* Login */
   async function handleLogin({email,password}) { 
        const data = await login({email,password});
        dispatch(setUser(data.user))
   }

  return { 
    handleRegister,
    handleLogin
   };

};


 