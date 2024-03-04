import { useEffect, useState } from 'react';
import CardOne1 from '../../components/CardOne1.jsx';
import axios from 'axios';
import CardFour from '../../components/CardFour.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import { useNavigate } from 'react-router-dom';
// import ChartThree from '../../components/ChartThree.tsx';
// import ChartTwo from '../../components/ChartTwo.tsx';
// import ChatCard from '../../components/ChatCard.tsx';
// import MapOne from '../../components/MapOne.tsx';
// import TableOne from '../../components/TableOne.tsx';

const ECommerce = () => {
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  // console.log('Blogs', blogs);

  const fetchProducts = async () => {
    const res = await axios.get(`${apiUrl}/api/product/all-products`);
    if (res.data) {
      setProducts(res.data.product);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="">
        {products.length === 0 && (
          <h1 className="w-full text-center font-bold text-2xl">
            No blogs to preview
          </h1>
        )}
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
        {products.map((items, index) => (
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
