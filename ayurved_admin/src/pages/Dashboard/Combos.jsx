import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Combos = () => {
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const [comboProd, setComboProd] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // console.log('Blogs', blogs);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/product/combos`);
      if (res.data) {
        setComboProd(res.data.products);
        // console.log('Combos : ', res.data.products);
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

  const handleDelete = async (id) => {
    const conf = confirm('Do you want to delete this item ?');
    if (!conf) {
      return;
    }
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/product/combo/${id}`,
      );
      if (data) {
        console.log('Deleted Combo : ', data.combo);
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      {comboProd.length === 0 && (
        <div>
          <h2 className="text-center pt-20 text-2xl">No Combos to Preview</h2>
        </div>
      )}
      {comboProd.length > 0 && (
        <div className="rounded-sm w-[80%] mx-auto border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col">
            <div className="grid grid-cols-2 items-center rounded-sm bg-gray-2 dark:bg-meta-4 md:grid-cols-4">
              <div className="p-2.5 hidden md:flex text-center sm:block xl:p-5">
                <h5 className="text-sm items-center font-medium uppercase xsm:text-base">
                  Title
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Image
                </h5>
              </div>
              <div className="hidden md:flex p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Price
                </h5>
              </div>
              <div className="p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Action
                </h5>
              </div>
            </div>
            {comboProd?.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-4 items-center"
              >
                <div className="hidden md:flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0 flex gap-1 py-2 scroll-container">
                    {/* <img
                      src={`http://localhost:8181/images/${b.bannerImage}`}
                      className="md:h-14 md:w-24 h-8 w-12 object-cover bg-cover"
                      alt="Brand"
                    /> */}
                    <h2>{product.title}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0 flex gap-1 py-2 scroll-container">
                    <img
                      src={`http://localhost:8181/images/${product.image}`}
                      className="md:h-14 md:w-24 h-8 w-12 object-cover bg-cover"
                      alt="Brand"
                    />
                  </div>
                </div>

                <div className="hidden md:block p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    ₹{product.price}
                  </h5>
                </div>
                {/* <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0 flex gap-1 py-2 scroll-container">
                    {comboProd?.products?.map((p) => (
                      // <img
                      //   src={`http://localhost:8181/images/${p.image}`}
                      //   className="md:h-14 md:w-24 h-8 w-12 object-cover bg-cover"
                      //   alt="Brand"
                      // />
                      <h2>{p.title}</h2>
                    ))}
                  </div>
                </div> */}

                <div className="items-center flex sm:justify-center sm:gap-4 ml-6 md:ml-8 py-2.5 sm:p-2.5 sm:flex xl:p-5">
                  <button
                    className="bg-danger text-2xl text-white sm:px-3 px-1 sm:py-2 rounded-sm"
                    onClick={() => handleDelete(product._id)}
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
