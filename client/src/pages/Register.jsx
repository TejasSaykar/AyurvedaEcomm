import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register`,
        { ...inputs }
      );
      if (data) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <Layout>
      <div className="w-full sm:h-[80vh] px-3 md:px-0 flex bg-[#FBFADA] flex-col items-center">
        <div className="w-full sm:w-1/3 lg:w-1/4 sm:mx-auto p-4 my-10 sm:my-0 md:mt-8 rounded-md bg-white">
          <h2 className="text-3xl font-semibold text-center pb-2">Register</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold text-gray-500">
                Username
              </label>
              <input
                type="text"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                className="ring-1 rounded-sm px-1 py-2 ring-gray-300"
              />
            </div>
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
            <div className="flex gap-4 items-center">
              <button
                onClick={handleSubmit}
                className="text-white font-bold bg-[#12372A] px-3 py-2 rounded-md"
              >
                Register
              </button>
              {error && <h2 className="font-medium text-red-600">{error}</h2>}
              {message && (
                <h2 className="font-medium text-green-600">"Message"</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
