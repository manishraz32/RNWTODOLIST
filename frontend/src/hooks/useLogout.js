import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from 'axios';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser } = useAuthContext();
    const logout = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`/api/auth/logout`);
            const data = res.data;

            if(!data.success) {
                throw new Error(data.message);
            }
            localStorage.removeItem("current-user");
            setAuthUser(null);
        } catch(error) {
            toast.error("logout failed");
        } finally {
            setLoading(false);
        }
    }

    return {loading, logout};
}

export default useLogout;