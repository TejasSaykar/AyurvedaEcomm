import { useEffect, useState } from 'react';
import CardOne1 from '../../components/CardOne1.jsx';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ECommerce = () => {
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // console.log('Blogs', blogs);

  const fetchProducts = async () => {
    try {
      setLoading(true);
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
      <div className="">
        <div className="flex justify-between">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Products
          </h4>
          {localStorage.getItem('isAdmin') && (
            <button
              className="mb-6 text-base font-semibold bg-meta-5 text-white px-4 py-2 rounded-sm dark:text-white"
              onClick={() => navigate(`${'/create/create-product'}`)}
            >
              Create Product
            </button>
          )}
        </div>
        {loading ? (
          <h1 className="w-full text-center font-bold text-2xl pt-20">
            Loading...
          </h1>
        ) : (
          <h2 className="text-lg pb-5 font-medium">
            {products.length > 0 ? 'Total' : 'No'}{' '}
            {products.length > 0 && products.length} Products Available
          </h2>
        )}

        {!localStorage.getItem('isAdmin') && (
          <div className="text-xl text-center pb-4">
            <Link to={'/auth/signin'} className="underline">
              Login as Admin to perform any operation
            </Link>
          </div>
        )}

        {products.length > 0 && (
          <div
            className={`grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:${
              localStorage.getItem('isAdmin') ? 'grid-cols-5' : 'grid-cols-4'
            }`}
          >
            <div className="hidden sm:block p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Image
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Title
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Quantity
              </h5>
            </div>
            <div className="p-2.5 hidden md:block text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Is Combo
              </h5>
            </div>
            {localStorage.getItem('isAdmin') && (
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Action
                </h5>
              </div>
            )}
          </div>
        )}
        {products.length > 0 &&
          products.map((items, index) => (
            <CardOne1
              fetchProducts={fetchProducts}
              key={index}
              item={items}
              type="product"
            />
          ))}
      </div>
    </>
  );
};

export default ECommerce;
