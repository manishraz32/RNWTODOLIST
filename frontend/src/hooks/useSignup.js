import {useState} from 'react';
import toast from "react-hot-toast";
import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const signup = async ({fullName, username, password, confirmPassword}) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword});
        
        if(!success) return;
        console.log("FullName", fullName);
        setLoading(true);
        try {
            const response = await axios.post('/api/auth/signup', {
                fullName,
                username,
                password,
                confirmPassword,
              }, {
                headers: { "Content-Type": "application/json" },
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
        } catch(error) {
            toast.error("sign up failed");
        } finally {
            setLoading(false);
        }
    }

    return {loading, signup};
}

const handleInputErrors = ({fullName, username, password, confirmPassword}) => {
    if(!fullName || !username || !password || !confirmPassword) {
        toast.error("Please fill  all fields");
        return false;
    }

    if(password !== confirmPassword) {
        toast.error("Password do not match");
        return false;
    }

    if(password.length < 6) {
        toast.error("password must be at least 6 characters");
    }

    return true;
}

export default useSignup
