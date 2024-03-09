import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

const PopupData = () => {
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/popups`,
        );
        if (data) {
          //   console.log('Popups  : ', data);
          setPopups(data.popups);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPopups();
  }, []);

  return (
    <div className="rounded-sm w-full mx-auto border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          {/* <div className="hidden sm:block p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Image
            </h5>
          </div> */}
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone
            </h5>
          </div>
          {/* <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Buyer Name
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Location
              </h5>
            </div> */}
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {popups?.map((popup) => (
          <div
            key={popup._id}
            className="grid grid-cols-2 md:grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-3"
          >
            {/* <div className="flex items-center justify-center p-2.5 xl:p-5">
                <div className="flex flex-col gap-1">
                  
                </div>
              </div> */}

            {/* <div className="sm:flex items-center justify-center p-2.5 xl:p-5">
                {popup?.products?.map((p) => (
                  <p className="text-meta-3">{p?.title}</p>
                ))}
              </div> */}

            <div className="sm:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{popup?.email}</p>
            </div>

            <div className="sm:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{popup?.phone}</p>
            </div>

            {/* <div className="hidden sm:flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0 flex gap-1 py-2 scroll-container overflow-x-scroll w-[150px] md:w-[200px]">
                {order?.products?.map((product) => (
                  <img
                    src={`http://localhost:8080/images/${product?.image}`}
                    className="h-10 w-10 rounded-full object-cover bg-cover"
                    alt="Brand"
                  />
                ))}
              </div>
            </div> */}

            <div className="hidden sm:items-center md:flex sm:justify-center sm:gap-4 ml-6 md:ml-8 py-2.5 sm:p-2.5 sm:flex xl:p-5">
              <button
                className="bg-danger text-white sm:px-3 px-1 sm:py-2 rounded-sm"
                  onClick={() => handleDelete(order._id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopupData;
