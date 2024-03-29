import React from "react";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";

const Combos = () => {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/product/combos`
        );
        if (data) {
          console.log("Combo Data :", data);
          setCombos(data.products);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchCombos();
  }, []);

  return (
    <Layout>
      <div className="bg-white pb-5 pt-10">
        {loading ? (
          // <h2 className="text-center text-xl font-semibold">Loading...</h2>
          <div className="grid  grid-cols-1 md:gap-4 space-y-4 py-10 md:space-y-0 md:grid-cols-3 px-4 md:w-[80%] mx-auto mb-8 md:mb-0">
            {Array(1, 2, 3, 4)?.map((item) => (
              <Link className="w-full relative -z-9 animate-pulse h-[300px] cursor-pointer flex flex-col gap-2 p-4 bg-gray-300/70 rounded-md">
                {item.quantity == 0 && (
                  <span className="absolute -z-2 p-1 px-2 bg-yellow-400 rounded-r-full font-semibold">
                    Out Of Stock
                  </span>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <h2 className="text-center text-xl font-semibold">
            {/* {combos.length > 0 ? combos.length : "No"} Combo{" "}
            {combos.length < 2 ? "Product" : "Products"} Available */}
            {location.pathname.split("/")}
          </h2>
        )}
      </div>
      <div className="w-full bg-white pb-10 flex">
        {!loading && (
          <div className="grid  grid-cols-1 md:gap-4 space-y-4 md:space-y-0 md:grid-cols-3 px-4 md:w-[80%] mx-auto mb-8 md:mb-0">
            {combos?.map((item) => (
              <Link
                to={`/details/${item._id}`}
                className="w-full relative -z-9 cursor-pointer flex flex-col gap-2 p-4 bg-gray-300/60 rounded-md"
                key={item._id}
              >
                {item.quantity == 0 && (
                  <span className="absolute -z-2 p-1 px-2 bg-yellow-400 rounded-r-full font-semibold">
                    Out Of Stock
                  </span>
                )}
                <div className="bg hover:mix-blend-normal">
                  <img
                    src={`https://brahmand.online:8181/images/${item.image1}`}
                    className="aspect-square object-cover"
                    alt=""
                  />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <div
                  className="px-2"
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                ></div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-1 items-center text-emerald-500">
                    <p>{item.review}</p>
                    <IoIosStar />
                  </div>
                  <h3 className="text-base font-semibold">₹{item.price}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Combos;
