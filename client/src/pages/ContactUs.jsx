import React from "react";
import Layout from "../components/Layout";

const ContactUs = () => {
  return (
    <Layout>
      <div className="w-full pt-5">
        <div className="top">{/* <h3>Contact Us</h3> */}</div>
        <div className="form w-full h-full flex bg-sky-100/30 mb-10 p-4 md:p-10">
          <form className="md:w-[77%] mx-auto flex flex-col gap-5">
            <h2 className="text-2xl text-center font-semibold">Contact Us</h2>
            <div className="flex flex-col md:flex-row w-full gap-5">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="" className="">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-2 border-[1px] border-gray-100 py-2"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="" className="">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-2 border-[1px] border-gray-100 py-2"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Mobile Number</label>
              <input
                type="number"
                className="w-full px-2 border-[1px] border-gray-100 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Message</label>
              <textarea
                className="w-full p-2 border-[1px] border-gray-100"
                name=""
                id=""
                cols="10"
                rows="4"
              ></textarea>
            </div>
            <div className="">
              <button className="bg-green-950 rounded-full px-6 font-semibold py-3 text-white">
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
