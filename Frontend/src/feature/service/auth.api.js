import axios from "axios";

const authApiInstanc = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register({ email, password, fullname, contact,isSeller }) {
  const response = await authApiInstanc.post("/register", {
    email,
    password,
    fullname,
    contact,
    isSeller,
  });

  return response.data;
}


export async function login({email,password}){
    const response = await authApiInstanc.post("/login", {
        email,
        password
    })
    return response.data
}