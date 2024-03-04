import React, { useEffect, useState } from 'react';
import CardOne from '../../components/CardOne';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditNews = () => {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  //   console.log('News', news);

  const fetchCategories = async () => {
    const res = await axios.get(`${apiUrl}/api/category/get-categories`);
    if (res.data) {
      setCategories(res.data.categories);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <>
        <div className="">
          {categories.length === 0 && (
            <h1 className="text-2xl w-full font-bold text-center">
              No News to preview
            </h1>
          )}

          <div className="flex justify-between">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Categories
            </h4>
            <button
              className="mb-6 text-base font-semibold bg-meta-5 text-white px-4 py-2 rounded-sm dark:text-white"
              onClick={() => navigate(`${'/create/create-category'}`)}
            >
              Create Category
            </button>
          </div>

          {categories.map((items, i) => (
            <CardOne
              fetchCategories={fetchCategories}
              key={i}
              item={items}
              type="category"
            />
          ))}
        </div>
      </>
    </div>
  );
};

export default EditNews;
