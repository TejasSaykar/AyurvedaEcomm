import React from "react";
import Layout from "../components/Layout";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import axios from "axios";
import { useState } from "react";

const ShopByProd = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/product/find-by-product/${slug}`
        );
        if (data) {
          // console.log("Product Category : ", data);
          setProducts(data.products);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  return (
    <Layout>
      <div className="bg-white pb-5 pt-10">
        {loading ? (
          <h2 className="text-center text-xl font-semibold">Loading...</h2>
        ) : (
          <h2 className="text-center text-xl font-semibold">
            {/* {products.length > 0 ? products.length : "No"}{" "}
            {products.length < 2 ? "product" : "products"} found */}
            {products.length < 1 && "No"} {location.pathname.split("/")[2]}{" "}
            {/* {products.length < 1 ? "products" : "product"} */}
          </h2>
        )}
      </div>
      <div className="w-full bg-white pb-10 flex">
        <div className="grid  grid-cols-1 md:gap-4 space-y-4 md:space-y-0 md:grid-cols-3 px-4 md:w-[80%] mx-auto mb-8 md:mb-0">
          {products?.map((item) => (
            <Link
              to={`/details/${item._id}`}
              className="w-full relative -z-9 cursor-pointer flex flex-col gap-2 p-4 bg-gray-300/20 rounded-md"
              key={item._id}
            >
              {item.quantity == 0 && (
                <span className="absolute -z-2 p-1 px-2 bg-yellow-400 rounded-r-full font-semibold">
                  Out Of Stock
                </span>
              )}
              <div className="">
                <img
                  src={`http://localhost:8181/images/${item.image}`}
                  className="aspect-square object-cover"
                  alt=""
                />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <h4 className="text-base">{item.desc}</h4>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center text-emerald-500">
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStarHalf />
                </div>
                <h3 className="text-base font-semibold">₹{item.price}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ShopByProd;
