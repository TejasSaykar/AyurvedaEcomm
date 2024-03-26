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
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchSingleProd = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/product/single-product/${id}`
      );
      if (data) {
        setProduct(data.product);
        // console.log("Single Product : ", data);
      }
    } catch (error) {
      console.log(error);
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
      <div className="w-full bg-gray-100">
        <div className="w-full grid md:grid-cols-2 px-3 pt-10 md:px-8">
          <div className="w-full">
            <div className="left w-full">
              {image ? (
                <img
                  src={`https://brahmand.online:8181/images/${image}`}
                  className="bg-gray-50 md:h-[90%] w-full border py-5 px-4 md:w-[60%] mx-auto md:aspect-square object-cover"
                  alt=""
                />
              ) : (
                <img
                  src={`https://brahmand.online:8181/images/${product.image1}`}
                  className="bg-gray-50 md:h-[90%] w-full border py-5 px-4 md:w-[60%] mx-auto md:aspect-square object-cover"
                  alt=""
                />
              )}
            </div>
            <div className="left flex md:ml-16 mt-2 items-center w-[60px] sm:w-[120px] md:w-[100px] lg:w-[160px] 2xl:w-[200px]">
              <img
                src={`https://brahmand.online:8181/images/${product.image1}`}
                onClick={() => setImage(product.image1)}
                className="bg-gray-50 md:h-[90%] w-full border py-5 cursor-pointer px-4 md:w-[60%] mx-auto md:aspect-square object-cover"
                alt=""
              />
              <img
                src={`https://brahmand.online:8181/images/${product.image2}`}
                onClick={() => setImage(product.image2)}
                className="bg-gray-50 md:h-[90%] w-full border py-5 cursor-pointer px-4 md:w-[60%] mx-auto md:aspect-square object-cover"
                alt=""
              />
              <img
                src={`https://brahmand.online:8181/images/${product.image3}`}
                onClick={() => setImage(product.image3)}
                className="bg-gray-50 md:h-[90%] w-full border py-5 cursor-pointer px-4 md:w-[60%] mx-auto md:aspect-square object-cover"
                alt=""
              />
              <img
                src={`https://brahmand.online:8181/images/${product.image4}`}
                onClick={() => setImage(product.image4)}
                className="bg-gray-50 md:h-[90%] w-full border py-5 cursor-pointer px-4 md:w-[60%] mx-auto md:aspect-square object-cover"
                alt=""
              />
              <img
                src={`https://brahmand.online:8181/images/${product.image5}`}
                onClick={() => setImage(product.image5)}
                className="bg-gray-50 md:h-[90%] w-full border py-5 cursor-pointer px-4 md:w-[60%] mx-auto md:aspect-square object-cover"
                alt=""
              />
            </div>
          </div>
          <div className="right w-full flex flex-col px-10">
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl mt-3 font-semibold">{product.title}</h2>
              {/* <p className="text-xl font-medium text-gray-800">
                {product.desc}
              </p> */}
              <div dangerouslySetInnerHTML={{ __html: product.desc }}></div>
              <div className="">
                <h2 className="text-lg text-gray-600 pb-1">Rating</h2>
                <div className="flex gap-2 items-center text-[#5dc23c]">
                  <p>{product.review}</p>
                  <IoIosStar />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {product.offerPrice !== 0 && (
                  <div className="flex gap-2 items-center">
                    <span className="text-red-500 font-bold">
                      {product.discountPrice}%
                    </span>
                    <h2>
                      ₹
                      <span className="font-bold text-lg">
                        {product.offerPrice}
                      </span>
                    </h2>
                  </div>
                )}
                <h2 className="text-[14px] flex gap-2 items-center font-medium">
                  M.R.P.:{" "}
                  <h4
                    className={`text-lg font-semibold ${
                      product.offerPrice !== 0 && "line-through"
                    }`}
                  >
                    ₹{product.price}
                  </h4>
                </h2>
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
