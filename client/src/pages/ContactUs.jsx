import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContactUs = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/contact`,
        {
          ...inputs,
        }
      );
      if (data) {
        // console.log("Message Data : ", data.contact);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="w-full pt-5">
        <div className="top">{/* <h3>Contact Us</h3> */}</div>
        <div className="form w-full h-full flex bg-[#FBFADA]/40 p-4 md:p-10">
          <form className="md:w-[77%] mx-auto flex flex-col gap-5">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-[#1B4242] pb-5">
                Contact Us Today !
              </h2>
              <h4 className="text-3xl font-medium">
                Let's Get Fit & Healthy Together
              </h4>
            </div>
            <div className="flex flex-col md:flex-row w-full gap-5">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="" className="">
                  Name
                </label>
                <input
                  type="text"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                  className="w-full px-2 border-[1px] border-gray-200 py-2 placeholder:text-gray-400"
                  placeholder="Name"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="" className="">
                  Email
                </label>
                <input
                  type="email"
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                  className="w-full px-2 border-[1px] border-gray-200 py-2 placeholder:text-gray-400"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Mobile Number</label>
              <input
                type="number"
                value={inputs.phone}
                onChange={(e) =>
                  setInputs({ ...inputs, phone: e.target.value })
                }
                className="w-full px-2 border-[1px] border-gray-200 py-2 placeholder:text-gray-400"
                placeholder="Phone"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Message</label>
              <textarea
                className="w-full p-2 border-[1px] border-gray-200 placeholder:text-gray-400"
                value={inputs.message}
                onChange={(e) =>
                  setInputs({ ...inputs, message: e.target.value })
                }
                placeholder="Message...."
                name=""
                id=""
                cols="10"
                rows="4"
              ></textarea>
            </div>
            <div className="">
              <button
                onClick={handleSubmit}
                className="bg-green-950 rounded-full px-6 font-semibold py-3 text-white"
              >
                Send
              </button>
            </div>
            <h3 className="text-[12px] font-normal">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </h3>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
