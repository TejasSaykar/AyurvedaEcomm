import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CreateCombos = () => {
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleCheckboxChange = (productId) => {
    setSelectedProductIds((prevSelectedProductIds) => {
      if (prevSelectedProductIds.includes(productId)) {
        return prevSelectedProductIds.filter((id) => id !== productId);
      } else {
        return [...prevSelectedProductIds, productId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let product = {
      title,
      desc,
      price,
      products,
      file,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      product.file = filename;
      try {
        axios.post(`${import.meta.env.VITE_BASE_URL}/upload/image`, data);
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/product/create-combo`,
          {
            title,
            desc,
            price,
            image: product.file,
            products: selectedProductIds,
          },
        );
        if (data) {
          // console.log('Combo Data : ', data);
          navigate('/combos');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {/* <div className="flex justify-between">
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
      )} */}
      {products.length > 0 && (
        <div className="rounded-sm w-[80%] mx-auto border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col">
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <div className="w-full flex gap-4">
                  <div className="w-full">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="px-1 py-2 ring-1 ring-black/30 rounded-sm w-full mb-3 placeholder:text-graydark placeholder:font-medium"
                      placeholder="Title..."
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="px-1 py-2 ring-1 ring-black/30 rounded-sm w-full mb-3 placeholder:text-graydark placeholder:font-medium"
                      placeholder="Description..."
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-full">
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="px-1 py-2 ring-1 ring-black/30 rounded-sm w-full mb-3 placeholder:text-graydark placeholder:font-medium"
                      placeholder="Price.."
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Title
                  </h5>
                </div>
                <div className="p-2.5 text-center sm:block xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Action
                  </h5>
                </div>
              </div>
              {products.map((product) => (
                <div key={product._id} className="grid grid-cols-2 w-full">
                  <div className="sm:flex items-center justify-center p-2.5 xl:p-5">
                    <h2>{product.title}</h2>
                  </div>
                  <div
                    key={product._id}
                    className="sm:flex items-center justify-center p-2.5 xl:p-5"
                  >
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
              <div className="flex justify-end">
                <button className="bg-meta-5 px-4 rounded-sm py-2 text-xl text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCombos;
