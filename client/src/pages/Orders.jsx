import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const userId = user._id;

  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/single-order/${userId}`
        );
        if (data) {
          console.log("User Orders : ", data.order);
          setOrder(data.order);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [userId]);

  return (
    <Layout>
      <div className="w-full pb-6 pt-10 bg-[#FBFADA]">
        {order.length === 0 && (
          <div className="py-10">
            <h2 className="text-2xl text-center font-semibold">
              No Orders Available !
            </h2>
          </div>
        )}
        {order.length > 0 && (
          <div className="rounded-sm w-[80%] shadow-xl mx-auto border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex flex-col">
              {loading && (
                <h2 className="text-center font-medium text-3xl py-5">
                  Loading...
                </h2>
              )}
              <div className="grid grid-cols-2  rounded-sm bg-[#1a4d3b] text-white sm:grid-cols-3">
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Status
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Buyer Name
                  </h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Products
                  </h5>
                </div>
              </div>

              {order.map((item) => (
                <div className="grid grid-cols-2 md:grid-cols-3 border-b border-stroke sm:grid-cols-3">
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black">{item?.status}</p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-meta-3">{item?.buyer.username}</p>
                  </div>

                  <div className="scroll-container1 hidden sm:flex overflow-scroll items-center gap-3 p-2.5 xl:p-5">
                    {item?.products?.map((p) => (
                      <div className="flex-shrink-0">
                        <img
                          src={`http://localhost:8181/images/${p?.image}`}
                          className="h-12 w-12 rounded-full object-cover bg-cover"
                          alt="Brand"
                        />
                      </div>
                    ))}
                  </div>

                  {/* <div className="sm:items-center flex sm:justify-center sm:gap-4 ml-6 md:ml-0 py-2.5 sm:p-2.5 sm:flex xl:p-5">
                  <button
                    className="bg-meta-3 text-white mx-3 md:mx-0 sm:px-3 px-1 sm:py-2 rounded-sm"
                  >
                    <h2>Buttons</h2>
                  </button>
                  <button
                    className="bg-danger text-white sm:px-3 px-1 sm:py-2 rounded-sm"
                  >
                    <h2>Buttons</h2>
                  </button>
                </div> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
