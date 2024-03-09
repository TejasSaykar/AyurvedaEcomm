import React, { useEffect, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { BsBag } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CgMenuRightAlt } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import {
  addFromCart,
  addToCart,
  emptyCart,
  removeProduct,
} from "../store/cartSlice";
import axios from "axios";
import { logout } from "../store/authSlice";
import Popup from "../pages/Popup";

const Navbar = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [catView, setCatView] = useState(false);
  const [mobCat, setMobCat] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(false);
  const [auth, setAuth] = useState(false);
  const [popup, setPopup] = useState("");
  const location = useLocation();
  const { products } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let total = 0;
  products?.map((item) => (total += item.quantity * item.price));

  const isActive = () => {
    window.scrollY > 2 ? setActive(true) : setActive(false);
  };

  let popupShown;
  useEffect(() => {
    popupShown = localStorage.getItem("popupShown");
    if (!popupShown) {
      setPopup(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleDelete = (id) => {
    dispatch(removeProduct({ _id: id }));
  };

  useEffect(() => {
    const fetchCat = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-categories`
      );
      if (data) {
        // console.log("Categories : ", data);
        setCategories(data.categories);
      }
    };
    fetchCat();
  }, []);

  const popupRef = useRef(null);
  const popupRef1 = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setCart(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setAuth(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleQty = (cm, item) => {
    if (cm === "dec") {
      if (quantity === 1) return;
      setQuantity((prev) => prev - 1);
    } else if (cm === "inc") {
      setQuantity((prev) => prev + 1);
    }
    dispatch(addFromCart({ item, quantity }));
  };

  return (
    <div className={`w-full shadow-lg ${popup && "bg-[#12372A]/50"}`}>
      {!active && (
        <div className="topNav sticky w-full bg-green-900 flex justify-between py-1 px-10 text-white">
          <div>
            <h3 className="text-sm font-semibold">
              Free Delivery On All Orders Above ₹399/-
            </h3>
          </div>
          <div className="hidden md:flex gap-2 text-lg p-[3px]">
            <FaInstagram />
            <FaFacebook />
            <IoLogoYoutube />
            <FaXTwitter />
          </div>
        </div>
      )}
      <div className="middle w-full grid grid-cols-2 text-center md:grid md:grid-cols-3 h-28 md:h-20 items-center p-2 md:px-10">
        <div className="left w-full hidden md:block">
          <div className="ring-1 grid grid-cols-2 px-5 ring-gray-200 rounded-full p-1.5 md:w-[20vw]">
            <input
              type="text"
              className="focus:outline-none bg-transparent placeholder:text-black placeholder:text-sm"
              placeholder="Search..."
            />
            <span className="text-2xl flex justify-end bg-transparent">
              <FiSearch />
            </span>
          </div>
        </div>

        <div className="middle w-full flex justify-center">
          <Link to={"/"} className="text-3xl md:text-2xl font-semibold">
            Ayurveda
          </Link>
        </div>
        <div className="relative right w-full flex justify-end">
          <div>
            {!cart && (
              <div className="flex gap-5 items-center">
                <div className="relative">
                  <h3
                    onClick={() => setAuth(!auth)}
                    className="text-3xl md:text-2xl cursor-pointer"
                  >
                    {token && user ? (
                      <h2 className="text-lg">{user.username}</h2>
                    ) : (
                      <IoPersonOutline />
                    )}
                  </h3>
                  {auth && (
                    <div
                      ref={popupRef}
                      className="absolute z-10 -right-20 md:right-2 rounded-md shadow-xl text-gray-700 py-2 px-8 bg-white text-base items-start flex flex-col gap-2"
                    >
                      {!token && (
                        <>
                          <Link
                            to={"/login"}
                            onClick={() => setAuth(!auth)}
                            className="hover:text-black"
                          >
                            Login
                          </Link>
                          <Link
                            to={"/register"}
                            onClick={() => setAuth(!auth)}
                            className="hover:text-black"
                          >
                            Register
                          </Link>
                        </>
                      )}
                      {token && (
                        <>
                          <button
                            onClick={() => {
                              setAuth(!auth),
                                dispatch(logout()),
                                navigate("/login");
                            }}
                            className="hover:text-black"
                          >
                            Logout
                          </button>
                          <Link
                            to={"/orders"}
                            onClick={() => setAuth(!auth)}
                            className="hover:text-black"
                          >
                            Orders
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative cursor-pointer">
                    <BsBag
                      className="text-3xl md:text-2xl"
                      onClick={() => {
                        token ? setCart(true) : navigate("/login");
                      }}
                    />
                    <h2
                      onClick={() => {
                        token ? setCart(true) : navigate("/login");
                      }}
                      className="absolute top-3 md:top-3 text-white -right-1 h-5 w-5 flex items-center justify-center bg-orange-600 text-lg rounded-full"
                    >
                      {products ? products?.length : "0"}
                    </h2>
                  </div>
                </div>
                <h2
                  className="hidden md:block cursor-pointer text-base transition-transform duration-100"
                  onClick={() => {
                    token ? setCart(true) : navigate("/login");
                  }}
                >
                  CART
                </h2>
                {!mobileNav ? (
                  <h2
                    onClick={() => {
                      token ? setMobileNav(true) : navigate("/login");
                    }}
                    className="text-3xl font-light md:hidden cursor-pointer transition-transform duration-100"
                  >
                    <CgMenuRightAlt />
                  </h2>
                ) : (
                  <h2
                    onClick={() => setMobileNav(false)}
                    className="text-3xl font-light md:hidden cursor-pointer transition-transform duration-100"
                  >
                    <MdClose />
                  </h2>
                )}
              </div>
            )}
            {cart && (
              <div
                onClick={() => setCart(false)}
                className="cursor-pointer flex gap-2 items-center"
              >
                <h2>CLOSE</h2>
                <MdClose className="text-xl" />
              </div>
            )}

            {cart && (
              <>
                <div
                  ref={popupRef}
                  className="absolute z-10 lg:w-[330px] pb-3 lg:pb-0 lg:h-20 text-center shadow-xl pt-3 w-full lg:left-[6rem] lg:top-[4rem] left-0 bg-white flex flex-col gap-2"
                >
                  <h2 className="text-xl w-full font-semibold bg-white">
                    Your Cart Is Empty
                  </h2>
                  <Link
                    to={"/"}
                    className={`mt-0 font-medium underline ${
                      location.pathname == "/" && "hidden"
                    }`}
                  >
                    Continue Shopping
                  </Link>
                </div>
                <div>
                  {products?.length > 0 && (
                    <div
                      ref={popupRef}
                      className="bg-white shadow-xl z-10 absolute transition-all ease-out duration-200 h-[80vh] md:top-[3.3rem] w-[320px] md:w-[400px] -right-3 md:-right-0 p-3"
                    >
                      <div className="scroll-container pt-4 overflow-y-scroll ">
                        {products?.map((item) => (
                          <div key={item._id} className="flex gap-2 mt-4">
                            <div className="relative p-2">
                              <img
                                src={`http://localhost:8080/images/${item.image}`}
                                className="h-32 w-32 object-cover bg-cover"
                                alt=""
                              />
                            </div>
                            <div className="relative flex flex-col gap-2">
                              <div className="flex justify-between w-full">
                                <h2 className="text-base w-full">
                                  {item.title}
                                </h2>
                              </div>
                              <div className="flex gap-2 items-center">
                                <h2 className="text-gray-700">Quantity : </h2>
                                <h4 className="font-semibold">
                                  {item?.quantity}
                                </h4>
                              </div>
                              <div className="flex gap-2 items-center">
                                <h2 className="text-gray-700">Price : </h2>
                                <h4 className="text-base font-semibold">
                                  ₹{item.price}
                                </h4>
                              </div>
                              <div className="flex justify-between">
                                <Link
                                  className="px-3 py-1 w-[max-content] bg-green-400 text-sm rounded-md font-semibold"
                                  to={`/details/${item._id}`}
                                  onClick={() => setCart(false)}
                                >
                                  View Product
                                </Link>
                                <button
                                  className="top-0 flex flex-end text-red-500 text-xl px-3 py-1 rounded-md md:-right-20"
                                  onClick={() => handleDelete(item._id)}
                                >
                                  <RiDeleteBin6Line />
                                </button>
                              </div>
                              {/* <div className="ring-1 w-[max-content] items-center ring-gray-300 rounded-lg px-2 py-1 mt-2 flex gap-3">
                          <span
                            className="px-1 cursor-pointer"
                            onClick={() => {
                              handleQty("dec"), item;
                            }}
                          >
                            -
                          </span>
                          <input
                            className="px-1 w-6"
                            value={item.quantity}
                            // onChange={(e) => setQuantity(e.target.value)}
                          />
                          <span
                            className="px-1 cursor-pointer"
                            onClick={() => {
                              handleQty("inc"), item;
                            }}
                          >
                            +
                          </span>
                        </div> */}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 mt-10">
                        <div className="flex justify-between mb-3">
                          <h2>Total Items</h2>
                          <h4 className="text-lg font-semibold">
                            {products.length}
                          </h4>
                        </div>
                        <div className=" flex justify-between">
                          <h2>Subtotal</h2>
                          <h4 className="text-lg font-semibold">₹{total}</h4>
                        </div>
                        <button
                          onClick={() => navigate("/place-order")}
                          className="bg-orange-500 w-full mt-5 py-3 rounded-full text-white font-semibold text-lg"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="w-[78vw] sm:w-[85vw] md:hidden ml-5 sm:ml-7 mx-auto grid grid-cols-2 ring-1 ring-gray-200 rounded-full px-2 py-2 mb-3 mt-4">
          <input
            type="text"
            className="focus:outline-none placeholder:text-black placeholder:text-sm"
            placeholder="Search..."
          />
          <span className="text-2xl flex justify-end">
            <FiSearch />
          </span>
        </div>
      </div>
      <div className="bottom relative hidden w-full border-t-[1px] h-12 md:flex items-center">
        <div className="w-[80%] h-full mx-auto flex justify-between text-sm text-gray-700">
          <div className="relative h-full">
            <button
              onMouseEnter={() => {
                setCatView(true);
              }}
              onMouseLeave={() => {
                setCatView(false);
              }}
              className="hover:border-b-2 hover:border-b-black h-full border-2 border-transparent"
              style={{ letterSpacing: "3px" }}
            >
              SHOP BY CATEGORY
            </button>
            {catView === true && (
              <div
                onMouseEnter={() => {
                  setCatView(true);
                }}
                onMouseLeave={() => {
                  setCatView(false);
                }}
                className="absolute z-5 hover:border-t-2 hover:border-t-black border-t-white w-full shadow-md flex flex-col gap-3 py-4 bg-white px-5"
              >
                {categories.map((cat) => (
                  <div key={cat._id} className="w-full">
                    <Link
                      to={`/shop-by-cat/${cat.name}`}
                      className="text-base hover:font-semibold w-full"
                    >
                      {cat.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link
            className="hover:border-b-2 hover:border-b-black flex items-center h-full border-2 border-transparent"
            style={{ letterSpacing: "3px" }}
          >
            SHOP BY PRODUCT
          </Link>
          <Link
            className="hover:border-b-2 hover:border-b-black h-full flex items-center  border-2 border-transparent"
            style={{ letterSpacing: "3px" }}
          >
            COMBOS
          </Link>
          <Link
            className="hover:border-b-2 hover:border-b-black h-full flex items-center  border-2 border-transparent"
            style={{ letterSpacing: "3px" }}
          >
            OFFERS
          </Link>
          <Link
            className="hover:border-b-2 hover:border-b-black h-full flex items-center  border-2 border-transparent"
            style={{ letterSpacing: "3px" }}
          >
            BLOG
          </Link>
          <Link
            className="hover:border-b-2 hover:border-b-black h-full flex items-center  border-2 border-transparent"
            style={{ letterSpacing: "3px" }}
          >
            CONSULT BY VAIDYA
          </Link>
        </div>
      </div>

      {mobileNav && (
        <div className="absolute w-full bg-white shadow-md pb-14 px-3 flex flex-col gap-3">
          <div className="flex flex-col gap-7 p-3 rounded-md bg-gray-300/30">
            <div className="flex relative justify-between">
              <Link onClick={() => setMobCat(true)} className="">
                Shop by Categoy
              </Link>
              <span className="cursor-pointer text-xl">
                <RiArrowRightSLine onClick={() => setMobCat(true)} />
              </span>

              {mobCat && (
                <div
                  ref={popupRef}
                  className="absolute rounded-md right-0 bg-white p-3"
                >
                  <h2
                    onClick={() => setMobCat(false)}
                    className="absolute right-1 top-1 text-3xl cursor-pointer"
                  >
                    <IoIosClose />
                  </h2>
                  {categories.map((c) => (
                    <div className="flex flex-col gap-3" key={c._id}>
                      <Link
                        className="mt-2 hover:text-gray-400 font-medium"
                        to={`/shop-by-cat/${c.name}`}
                        onClick={() => {
                          setMobileNav(false), setMobCat(false);
                        }}
                      >
                        {c.name}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <Link className="">Shop by Product</Link>
              <span className="cursor-pointer text-xl">
                <RiArrowRightSLine />
              </span>
            </div>
            <div className="flex justify-between">
              <Link className="">Combos</Link>
              <span className="cursor-pointer text-xl">
                <RiArrowRightSLine />
              </span>
            </div>
            <div className="flex justify-between">
              <Link className="">Offers</Link>
              <span className="cursor-pointer text-xl">
                <RiArrowRightSLine />
              </span>
            </div>
          </div>
        </div>
      )}
      {popup && <Popup setPopup={setPopup} />}
    </div>
  );
};

export default Navbar;
