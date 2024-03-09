import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CreateCombos = () => {
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState([]);
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

  // useEffect(() => {
  //   // Initialize selectedProductIds with the first product ID if it's available
  //   if (products.length > 0 && selectedProductIds.length === 0) {
  //     setSelectedProductIds([products[0]._id]);
  //   }
  // }, [products, selectedProductIds]);

  const handleCheckboxChange = (productId) => {
    setSelectedProductIds((prevSelectedProductIds) => {
      if (prevSelectedProductIds.includes(productId)) {
        return prevSelectedProductIds.filter((id) => id !== productId);
      } else {
        return [...prevSelectedProductIds, productId];
      }
    });
    console.log('Selected Products : ', selectedProductIds);
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
      {products.length < 0 && (
        <div>
          <h2 className="text-center pt-20 text-2xl">No Banners to Preview</h2>
        </div>
      )}
      {products.length > 0 && (
        <div className="rounded-sm w-[80%] mx-auto border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col">
            <form>
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
              {products.map((product) => (
                <div key={product._id} className="grid grid-cols-2">
                  <div>
                    <h2>{product.title}</h2>
                  </div>
                  <div key={product._id}>
                    <input
                      type="checkbox"
                      id={product._id}
                      value={product._id}
                      checked={selectedProductIds.includes(product._id)}
                      onChange={() => handleCheckboxChange(product._id)}
                    />
                    <label htmlFor={product._id}>{product.name}</label>
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCombos;
