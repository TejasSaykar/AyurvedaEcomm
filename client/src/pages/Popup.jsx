import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";

const Popup = ({ setPopup }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const popupShown = localStorage.getItem("popupShown");
    if (!popupShown) {
      setShowPopup(true);
      // document.body.style.overflow = "hidden";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !phone) {
      setError("All fields are required !");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/popup`,
        {
          email,
          phone,
        }
      );
      if (data) {
        console.log("Popup Data : ", data);
        setEmail("");
        setPhone("");
      }
      setPopup(false);
      setShowPopup(false);
      localStorage.setItem("popupShown", "true");
      document.body.style.overflow = "auto";
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setPopup(false);
    document.body.style.overflow = "scroll";
  }

  return (
    <>
      <div
        className={`z-999 w-full h-screen bg-[#12372A]/50 absolute pt-5 text-white z-50`}
      >
        <div className={`md:w-1/3 mx-2 md:mx-auto rounded-sm relative bg-[#436850] ${
          showPopup
            ? "-translate-y-0 opacity-100 transition-transform ease-out duration-700"
            : "-translate-y-full opacity-0 transition-transform ease-in duration-700"
        }`}>
          <div className="p-3 right-0 absolute">
            <MdClose
              className="text-2xl cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <form onSubmit={handleSubmit} className="p-5">
            <h2 className="text-3xl py-6 font-semibold text-center text-white">
              You have a chance to be a part of our family
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-base font-bold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="placeholder:px-1 text-base font-semibold px-1 py-2 text-black rounded-sm placeholder:font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-base font-bold">
                  Phone
                </label>
                <input
                  type="number"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="placeholder:px-1 text-base font-semibold px-1 py-2 text-black rounded-sm placeholder:font-semibold"
                />
              </div>
              <div className="flex gap-3 items-center">
                <button className="bg-[#12372A] px-4 py-2 rounded-sm font-semibold">
                  Submit
                </button>
                <div>
                  {error && (
                    <h2 className="text-base font-bold text-red-400">
                      {error}
                    </h2>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Popup;
