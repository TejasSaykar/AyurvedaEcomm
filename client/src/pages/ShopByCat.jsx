import React from "react";
import Layout from "../components/Layout";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import axios from "axios";
import { useState } from "react";

const ShopByCat = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/product/product-category/${slug}`
      );
      if (data) {
        // console.log("Product Category : ", data);
        setProducts(data.products);
      }
    };
    fetchProduct();
  }, [slug]);

  return (
    <Layout>
      <div className="bg-white pb-5 pt-10">
        {products.length === 0 ? (
          <h2 className="text-center text-xl font-semibold">
            No products with this category
          </h2>
        ) : (
          <h2 className="text-center text-xl font-semibold">
            {products.length} {products.length < 2 ? "product" : "Products"}{" "}
            found with this Category
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

export default ShopByCat;
