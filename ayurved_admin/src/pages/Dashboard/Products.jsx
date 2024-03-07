import { useEffect, useState } from 'react';
import CardOne1 from '../../components/CardOne1.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ECommerce = () => {
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

  if (loading) {
    <h2 className="text-2xl text-center">Loading...</h2>;
    return;
  }

  return (
    <>
      <div className="">
        <div className="flex justify-between">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Products
          </h4>
          <button
            className="mb-6 text-base font-semibold bg-meta-5 text-white px-4 py-2 rounded-sm dark:text-white"
            onClick={() => navigate(`${'/create/create-product'}`)}
          >
            Create Product
          </button>
        </div>
        {products.length < 1 && (
          <h1 className="w-full text-center font-bold text-2xl pt-20">
            No blogs to preview
          </h1>
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
