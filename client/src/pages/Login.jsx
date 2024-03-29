import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  // const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { ...inputs }
      );
      if (data) {
        // console.log("Login Data : ", data);
        dispatch(login(data));
        navigate("/");
        message.success("Login Successfully");
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <Layout>
      <div className="w-full sm:h-[80vh] pt-10 flex bg-[#FBFADA] flex-col items-center">
        <div className="sm:w-1/3 lg:w-1/4 mx-auto p-4 md:mt-20 my-10 sm:my-0 rounded-md bg-white">
          <h2 className="text-3xl font-semibold text-center">Login</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold text-gray-500">
                Email
              </label>
              <input
                type="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                className="ring-1 rounded-sm px-1 py-2 ring-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold text-gray-500">
                Password
              </label>
              <input
                type="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                className="ring-1 rounded-sm px-1 py-2 ring-gray-300"
              />
            </div>
            <div className="flex gap-2 flex-col">
              {loading ? (
                <button
                  disabled
                  className="text-white animate-pulse items-start font-bold bg-[#12372A] px-3 py-2 rounded-md"
                >
                  Loading...
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="text-white items-start font-bold bg-[#12372A] px-3 py-2 rounded-md"
                >
                  Login
                </button>
              )}
              <span className="text-blue-600 text-center">
                Don't have account?{" "}
                <Link className="underline" to={"/register"}>
                  Register
                </Link>
              </span>
            </div>
            {error && (
              <h2 className="font-medium text-center text-red-600">{error}</h2>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
