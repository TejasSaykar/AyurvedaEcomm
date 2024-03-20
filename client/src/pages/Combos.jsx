import React from "react";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";

const Combos = () => {
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/product/combos`
        );
        if (data) {
          console.log("Combo Data :", data);
          setCombos(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCombos();
  }, []);

  return (
    <Layout>
      <div className="bg-white pb-5 pt-10">
        {combos.length === 0 ? (
          <h2 className="text-center text-xl font-semibold">
            No combos with this category
          </h2>
        ) : (
          <h2 className="text-center text-xl font-semibold">
            {combos.length} Combo {combos.length < 2 ? "Product" : "Products"}{" "}
            Available
          </h2>
        )}
      </div>
      <div className="w-full bg-white pb-10 flex">
        <div className="grid  grid-cols-1 md:gap-4 space-y-4 md:space-y-0 md:grid-cols-4 px-4 md:w-[80%] mx-auto mb-8 md:mb-0">
          {combos?.map((item) => (
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
                  src={`https://brahmand.online:8181/images/${item.image}`}
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

export default Combos;
