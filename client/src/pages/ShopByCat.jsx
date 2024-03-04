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
      <div className="w-full py-10 flex">
        <div className="grid grid-cols-1 md:gap-4 md:grid-cols-3 px-4 md:w-[80%] mx-auto mb-8 md:mb-0">
          {products?.map((item) => (
            <Link
              to={`/details/${item._id}`}
              className="w-full cursor-pointer flex flex-col gap-2 p-4 bg-gray-300/20 rounded-md"
              key={item._id}
            >
              <div className="">
                <img
                  src={`http://localhost:8080/images/${item.image}`}
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
