import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { BACKEND_BASE_URL } from "../constants";
import toast from "react-hot-toast";

type SignUpInputs = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (inputs: SignUpInputs) => {
    setLoading(true);
    try {
      const res = await axios.post(
        BACKEND_BASE_URL + "/api/auth/signup",
        inputs,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setAuthUser(res?.data?.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
