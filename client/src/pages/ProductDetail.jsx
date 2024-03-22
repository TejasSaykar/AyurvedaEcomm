import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchSingleProd = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/product/single-product/${id}`
    );
    if (data) {
      setProduct(data.product);
      // console.log("Single Product : ", data);
    }
  };

  const addToCartProd = () => {
    dispatch(addToCart({ ...product, quantity }));
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
      // navigate("/");
    }, 3000);
  };

  const placeOrder = () => {
    dispatch(addToCart({ ...product, quantity }));
    setMessage(true);
    navigate("/place-order");
    setTimeout(() => {
      setMessage(false);
    }, 3000);
  };

  useEffect(() => {
    fetchSingleProd();
  }, [id, quantity, addToCartProd]);

  const handleQty = (cm) => {
    if (cm === "dec") {
      if (quantity === 1) return;
      setQuantity((prev) => prev - 1);
    } else if (cm === "inc") {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <Layout>
      <div className="w-full bg-[#FBFADA]">
        <div className="w-full grid md:grid-cols-2 px-3 pt-10 md:px-8">
          <div className="left w-full">
            <img
              src={`http://localhost:8181/images/${product.image}`}
              className="md:h-[90%] w-full border py-5 px-4 md:w-[90%] md:aspect-square object-cover"
              alt=""
            />
          </div>
          <div className="right w-full flex flex-col items-center">
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl mt-3 font-semibold">{product.title}</h2>
              <p className="text-xl font-medium text-gray-800">
                {product.desc}
              </p>
              <div className="">
                <h2 className="text-lg text-gray-600 pb-1">Rating</h2>
                <div className="flex gap-2 items-center text-[#5dc23c]">
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStarHalf />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-[14px] font-medium">
                  MRP (Including all taxes)
                </h2>
                <h4 className="text-lg font-semibold">₹{product.price}</h4>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-[14px] font-medium">Quantity</h2>
                <div className="ring-1 w-[max-content] items-center ring-gray-300 rounded-lg px-2 py-1 mt-2 flex gap-3">
                  <span
                    className="px-1 cursor-pointer"
                    onClick={() => handleQty("dec")}
                  >
                    -
                  </span>
                  <span className="px-1">{quantity}</span>
                  <span
                    className="px-1 cursor-pointer"
                    onClick={() => handleQty("inc")}
                  >
                    +
                  </span>
                </div>
                <div className="mt-5 md:mt-10 md:w-[70%] text-white text-center text-lg rounded-full cursor-pointer">
                  {product.quantity < 1 ? (
                    <button
                      disabled
                      className="cursor-pointer w-full bg-yellow-600 px-6 py-2 rounded-full"
                    >
                      Out Of Stock
                    </button>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <button
                        disabled={product.quantity < 1}
                        onClick={addToCartProd}
                        className="cursor-pointer w-full bg-orange-600 px-6 py-2 rounded-full"
                      >
                        Add To Cart
                      </button>
                      <button
                        disabled={product.quantity < 1}
                        onClick={placeOrder}
                        className="cursor-pointer w-full bg-green-600 px-6 py-2 rounded-full"
                      >
                        Place Order
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-center h-8 md:w-[70%] my-2">
                  {message && (
                    <h2 className="text-lg font-semibold text-green-500">
                      Product Added To Cart
                    </h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
