import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateOffer = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [review, setReview] = useState('');
  const [isOffer, setIsOffer] = useState(false);
  const [files, setFiles] = useState([]);

  console.log('Files : ', files);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(`${apiUrl}/api/category/get-categories`);
      if (data) {
        // console.log('Categories : ', data.categories);
        setCategories(data?.categories);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let product = {
      title,
      description,
      category,
      price,
      review,
      quantity,
      isOffer,
      files,
    };
    if (files) {
      const data = new FormData();
      files.forEach((file) => {
        (filename = Date.now() + file.name),
          data.append('name', filename),
          data.append('file', file);
      });

      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/upload/image`, data);
      } catch (error) {
        console.log(error);
        // message.error(error.response.data.message)
      }
      try {
        const res = await axios.post(`${apiUrl}/api/product/create-product`, {
          ...product,
          category: product.category,
          desc: product.description,
          isOffer: product.isOffer,
          image: product.files,
        });
        if (res.data) {
          // console.log('Data : ', res.data);
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFile = (e) => {
    setFiles(Array.from(e.target.files));
  };

  return (
    <>
      <Breadcrumb pageName="Create Offer" />

      <div className="w-full">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Offer
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-0 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-0 mt-4 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Category
                    </label>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      {categories.map((c) => (
                        <option selected={c._id} key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Review
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Review"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-0 mt-4 flex justify-center items-center flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Quantity
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Qunatity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full flex flex-col items-center">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Is Offer
                    </label>
                    <input
                      type="checkbox"
                      checked={isOffer}
                      onChange={(e) => setIsOffer(!isOffer)}
                      className="h-5 w-5 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="w-full mt-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 mt-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    placeholder="Select image"
                    accept="image/*"
                    multiple
                    onChange={handleFile}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOffer;
