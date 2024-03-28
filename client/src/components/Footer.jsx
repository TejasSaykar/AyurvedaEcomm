import React, { useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { GoMail } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { message } from "antd";

const Footer = () => {
  const prodMenu = [
    {
      name: "Juices",
      path: "juices",
    },
    {
      name: "Herbal Powders",
      path: "herbalpowder",
    },
    {
      name: "Tablets",
      path: "tablets",
    },
    {
      name: "Oils",
      path: "oils",
    },
  ];

  const [email, setEmail] = useState("");

  const handleNewsletter = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/subscribe`,
        { email }
      );
      if (data) {
        // console.log("News Letter : ", data);
        message.success("Subscribed to Newsletter");
        setEmail("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full bg-sky-50 border-t-[1px] border-b-[1.5px]">
        <div className="grid grid-cols-1 gap-5 md:gap-2 md:grid-cols-5 py-10 w-[80%] mx-auto">
          <div className="one flex flex-col gap-3">
            <h1 className="md:text-base text-2xl font-semibold">Shop</h1>
            <div className="flex flex-col gap-2 text-lg md:text-sm">
              {prodMenu.map((item) => (
                <Link key={item.name} to={`/shop-by-prod/${item.path}`}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="two flex flex-col gap-3">
            <h1 className="md:text-base text-2xl font-semibold">About</h1>
            <div className="flex flex-col text-lg gap-2 md:text-sm">
              <Link to={"/about-us"} className="cursor-pointer">
                About Us
              </Link>
              <Link to={"/contact-us"} className="cursor-pointer">
                Contact Us
              </Link>
              <Link to={"/terms-and-conditions"} className="cursor-pointer">
                Terms And Conditions
              </Link>
            </div>
          </div>
          <div className="two flex flex-col gap-3">
            <h1 className="md:text-base text-2xl font-semibold">
              Subscribe Our Newsletter
            </h1>
            <div className="flex flex-col text-lg gap-2 md:text-sm">
              <div className="border w-full bg-white border-gray-200 flex justify-between items-center py-1 px-2 rounded-full">
                <div className="w-2/3">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email id"
                    className="focus:outline-none w-full bg-transparent text-gray-700  font-medium placeholder:text-gray-400 placeholder:font-medium"
                  />
                </div>
                <div className="text-2xl bg-green-800 cursor-pointer p-2 rounded-full flex justify-center items-center">
                  <IoSend className="text-white" onClick={handleNewsletter} />
                </div>
              </div>
            </div>
          </div>
          <div className="four flex flex-col gap-3 md:ml-12">
            <h1 className="md:text-base text-2xl font-semibold">
              Get in touch
            </h1>
            <div className="flex flex-col gap-2">
              <h2 className="flex gap-2 items-center">
                <IoCallOutline className="text-lg" />
                <span className="font-normal md:text-sm text-lg cursor-pointer">
                  +91 7083467359
                </span>
              </h2>
              <h2 className="flex gap-2 items-center">
                <IoCallOutline className="text-lg" />
                <span className="font-normal md:text-sm text-lg cursor-pointer">
                  +91 9175534218
                </span>
              </h2>
              <h2 className="flex gap-2 items-center">
                <GoMail className="text-lg" />
                <a
                  href="mailto:gangagiriayurvedhealth@gmail.com"
                  className="underline font-normal md:text-sm text-lg cursor-pointer"
                >
                  Email us
                </a>
              </h2>
            </div>
          </div>
          <div className="five flex flex-col gap-2">
            <h1 className="md:text-base text-2xl font-semibold">Follow us</h1>
            <div className="flex gap-2 text-3xl text-green-950">
              <a
                href="https://www.instagram.com/gangagiri_ayurved_health?igsh=NTl5MmNheXNzbGw5&utm_source=qr"
                target="_blanck"
              >
                <FaInstagram className="cursor-pointer" />
              </a>
              {/* <FaFacebook className="cursor-pointer" />
              <IoLogoYoutube className="cursor-pointer" />
              <FaXTwitter className="cursor-pointer" /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center flex items-center justify-center bg-sky-50 pt-5 pb-9">
        <div className="flex w-full gap-5 text-[13px] items-center justify-center text-center">
          <h2>@ 2024 Ayurveda All Rights Reserved.</h2>
          <Link
            to={"/terms-and-conditions"}
            className="hidden md:block border-b-[1px] border-gray-600"
          >
            Terms & Conditions
          </Link>
          <h3 className="hidden md:block border-b-[1px] border-gray-600">
            Privacy Policy
          </h3>
          <h3 className="hidden md:block border-b-[1px] border-gray-600">
            Shipping Policy
          </h3>
          <h3 className="hidden md:block border-b-[1px] border-gray-600">
            Return Policy
          </h3>
          <h3 className="hidden md:block border-b-[1px] border-gray-600">
            Disclaimer
          </h3>
        </div>
      </div>
    </>
  );
};

export default Footer;
