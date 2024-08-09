import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({username, password}) => {
    console.log("username", username);
    console.log("password", password);
    const validate = validateLoginInData({username, password});
    if(!validate) return;
    setLoading(true);
    try {
      const response = await axios.post("api/auth/login", {
        username, password
      });

      const { data } = response;
      console.log("data", data);
      if (!data.success) {
        throw new Error(data.message);
      }

      // Set user's detail into local storage
      localStorage.setItem('current-user', JSON.stringify(data.data));
      setAuthUser(data.data);
      toast.success(data.message || "signup successfully");
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

const validateLoginInData = ({username, password}) => {
    if(!username || !password) {
        toast.error("values can't be empty");
        return false;
    }

    if(password.length < 6) {
        toast.error("password must be atleast 6 character");
        return false;
    }

    return true;
}

export default useLogin;
