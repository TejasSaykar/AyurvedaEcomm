import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { emptyCart, removeProduct } from "../store/cartSlice";
import axios from "axios";
import { useState } from "react";
import { message } from "antd";

let states = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const PlaceOrder = () => {
  const [fullname, setFullname] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [email, setEmail] = useState("");
  const [town, setTown] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState(false);

  const { products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let total = 0;
  products.map((p) => (total += p.quantity * p.price));

  let userId;
  if (!user) {
    userId = import.meta.env.VITE_DUMMY_ID;
  } else {
    userId = user._id;
  }

  const handleDelete = (id) => {
    dispatch(removeProduct({ _id: id }));
  };

  const handleOrder = async () => {
    if (!phone || !pincode || !town || !area || !landmark || !state) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/order`,
        {
          products,
          fullname,
          flatNo,
          phone,
          area,
          landmark,
          email,
          pincode,
          town,
          state,
          userId,
        }
      );
      if (data) {
        console.log("Order Data : ", data);
        localStorage.removeItem("persist:root");
        dispatch(emptyCart());
        navigate("/orders");
        message.success("Order Placed");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="w-full pb-8 pt-14 bg-[#FBFADA]">
        <div className="w-[90%] mx-auto grid bg-white gap-8 p-4 md:grid-cols-2">
          <div className="w-full flex flex-col mt-10 md:gap-9 border-r-[1.2px] pr-5">
            <h2 className="text-3xl font-semibold text-center">
              Add Shipping Address
            </h2>
            <div className="flex flex-col md:flex-row gap-4 p-2 mt-5">
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full ring-1 px-2 py-2 placeholder:text-gray-500 rounded-sm ring-gray-300"
                placeholder="Full Name"
              />
              <input
                type="text"
                value={flatNo}
                onChange={(e) => setFlatNo(e.target.value)}
                className="w-full ring-1 px-2 py-2 placeholder:text-gray-500 rounded-sm ring-gray-300"
                placeholder="Flat, House no., Company, Apartment"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 p-2">
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full ring-1 px-2 py-2 placeholder:text-gray-500 rounded-sm ring-gray-300"
                placeholder="Phone Number"
              />
              <input
                type="number"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full ring-1 px-2 py-2 placeholder:text-gray-500 rounded-sm ring-gray-300"
                placeholder="Pincode"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 p-2">
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full ring-1 px-2 py-2 placeholder:text-gray-500 rounded-sm ring-gray-300"
                placeholder="Area, Street, Sector, Village"
              />
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full ring-1 px-2 py-2 placeholder:text-gray-500 rounded-sm ring-gray-300"
                placeholder="Landmark"
              />
            </div>
            <div className="p-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full ring-1 px-2 py-2 placeholder:text-gray-500 rounded-sm ring-gray-300"
                placeholder="Email(optional)"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 p-2">
              <input
                type="text"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                className="w-full ring-1 px-2 py-2 placeholder:text-gray-500 rounded-sm ring-gray-300"
                placeholder="Town/City"
              />
              {/* <input
                type="number"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full ring-1 px-2 py-2 placeholder:text-gray-500 rounded-sm ring-gray-300"
                placeholder="Landmark"
              /> */}

              <select
                className="w-full ring-1 px-2 py-2 rounded-sm ring-gray-300"
                onChange={(e) => setState(e.target.value)}
              >
                {states.map((state) => (
                  <option value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              {error && (
                <h2 className="text-lg font-semibold text-red-500 text-center">
                  All fields are required
                </h2>
              )}
            </div>
          </div>
          <div className="w-full p-4 bg-pink-200/10">
            <h2 className="text-xl font-semibold">Order</h2>
            <div>
              <h3 className="text-base font-medium mt-4">Order Summary</h3>
              <div>
                {products.length === 0 && (
                  <div
                    className={`w-full ${
                      products.length === 0 && "hidden"
                    } mt-8 text-center text-lg font-semibold`}
                  >
                    {products.length === 0 && <h2>No product in your cart</h2>}
                  </div>
                )}
                {products?.length > 0 && (
                  <div className="w-full p-3 mt-2">
                    <div className="scroll-container1 overflow-y-scroll ">
                      {products?.map((item) => (
                        <div
                          key={item._id}
                          className="flex md:flex-row flex-col w-full gap-2"
                        >
                          <div className="p-2">
                            <img
                              src={`http://localhost:8181/images/${item.image}`}
                              className="h-32 w-32 object-cover bg-cover"
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between w-full">
                              <h2 className="text-base w-full">{item.title}</h2>
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
                              {/* <Link
                                className="px-3 py-1 w-[max-content] bg-green-400 text-sm rounded-md font-semibold"
                                to={`/details/${item._id}`}
                                onClick={() => setCart(false)}
                              >
                                View Product
                              </Link> */}
                              <button
                                className="top-0 flex flex-end text-red-500 text-xl px-3 py-1 rounded-md md:-right-20"
                                onClick={() => handleDelete(item._id)}
                              >
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3">
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
                        onClick={handleOrder}
                        className="bg-orange-500 w-full mt-5 py-3 rounded-full text-white font-semibold text-lg"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlaceOrder;
