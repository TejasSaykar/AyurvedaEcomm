import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Combos = () => {
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // console.log('Blogs', blogs);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/product/all-products`);
      if (res.data) {
        setProducts(res.data.product);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Combo Products
        </h4>
        <button
          className="mb-6 text-base font-semibold bg-meta-5 text-white px-4 py-2 rounded-sm dark:text-white"
          onClick={() => navigate(`${'/create-combo'}`)}
        >
          Create Combo
        </button>
      </div>
      {products.length < 0 && (
        <div>
          <h2 className="text-center pt-20 text-2xl">No Banners to Preview</h2>
        </div>
      )}
      {products.length > 0 && (
        <div className="rounded-sm w-[80%] mx-auto border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col">
            <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Banner Image
                </h5>
              </div>
              <div className="p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Action
                </h5>
              </div>
            </div>
            {products?.map((b) => (
              <div
                key={b._d}
                className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-2"
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0 flex gap-1 py-2 scroll-container">
                    <img
                      src={`http://localhost:8080/images/${b.bannerImage}`}
                      className="md:h-14 md:w-24 h-8 w-12 object-cover bg-cover"
                      alt="Brand"
                    />
                  </div>
                </div>

                <div className="items-center flex sm:justify-center sm:gap-4 ml-6 md:ml-8 py-2.5 sm:p-2.5 sm:flex xl:p-5">
                  <button
                    className="bg-danger text-2xl text-white sm:px-3 px-1 sm:py-2 rounded-sm"
                    // onClick={() => handleDelete(b._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Combos;
