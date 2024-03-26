import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { useRef } from 'react';
import DOMPurify from 'dompurify';

const FormLayout = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [review, setReview] = useState('');
  const [isCombo, setIsCombo] = useState(false);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);


  const [categories, setCategories] = useState([]);

  const editor = useRef(null);

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
    const sanitizedHtmlContent = DOMPurify.sanitize(description);
    let product = {
      title,
      sanitizedHtmlContent,
      category,
      price,
      offerPrice,
      review,
      quantity,
      isCombo,
      file1,
      file2,
      file3,
      file4,
      file5,
    };
    if (file1) {
      const data1 = new FormData();
      const filename = Date.now() + file1.name;
      data1.append('name', filename);
      data1.append('file', file1);
      product.file1 = filename;

      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/upload/image`,
          data1,
        );
      } catch (error) {
        console.log(error);
        // message.error(error.response.data.message)
      }

      if (file2) {
        const data2 = new FormData();
        const filename = Date.now() + file2.name;
        data2.append('name', filename);
        data2.append('file', file2);
        product.file2 = filename;

        try {
          await axios.post(
            `${import.meta.env.VITE_BASE_URL}/upload/image`,
            data2,
          );
        } catch (error) {
          console.log(error);
          // message.error(error.response.data.message)
        }
      }

      if (file3) {
        const data3 = new FormData();
        const filename = Date.now() + file3.name;
        data3.append('name', filename);
        data3.append('file', file3);
        product.file3 = filename;

        try {
          await axios.post(
            `${import.meta.env.VITE_BASE_URL}/upload/image`,
            data3,
          );
        } catch (error) {
          console.log(error);
          // message.error(error.response.data.message)
        }
      }

      if (file4) {
        const data4 = new FormData();
        const filename = Date.now() + file4.name;
        data4.append('name', filename);
        data4.append('file', file4);
        product.file4 = filename;

        try {
          await axios.post(
            `${import.meta.env.VITE_BASE_URL}/upload/image`,
            data4,
          );
        } catch (error) {
          console.log(error);
          // message.error(error.response.data.message)
        }
      }

      if (file5) {
        const data5 = new FormData();
        const filename = Date.now() + file5.name;
        data5.append('name', filename);
        data5.append('file', file5);
        product.file5 = filename;

        try {
          await axios.post(
            `${import.meta.env.VITE_BASE_URL}/upload/image`,
            data5,
          );
        } catch (error) {
          console.log(error);
          // message.error(error.response.data.message)
        }
      }

      try {
        const res = await axios.post(`${apiUrl}/api/product/create-product`, {
          ...product,
          category: product.category,
          desc: product.sanitizedHtmlContent,
          isCombo: product.isCombo,
          image1: product.file1,
          image2: product.file2,
          image3: product.file3,
          image4: product.file4,
          image5: product.file5,
        });
        if (res.data) {
          console.log('Data : ', res.data);
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Breadcrumb pageName="Create Product" />

      <div className="w-full">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Product
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

                <div className="w-full mt-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Offer Price
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Price"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
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
                      Is Combo
                    </label>
                    <input
                      type="checkbox"
                      checked={isCombo}
                      onChange={(e) => setIsCombo(!isCombo)}
                      className="h-5 w-5 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="w-full mt-4">
                  {/* <label className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  /> */}

                  <JoditEditor
                    ref={editor}
                    onChange={(content) => setDescription(content)}
                  />
                </div>

                <div className="mb-4.5 mt-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Upload Image 1
                  </label>
                  <input
                    type="file"
                    placeholder="Select image"
                    onChange={(e) => setFile1(e.target.files[0])}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5 mt-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Upload Image 2
                  </label>
                  <input
                    type="file"
                    placeholder="Select image"
                    onChange={(e) => setFile2(e.target.files[0])}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5 mt-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Upload Image 3
                  </label>
                  <input
                    type="file"
                    placeholder="Select image"
                    onChange={(e) => setFile3(e.target.files[0])}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5 mt-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Upload Image 4
                  </label>
                  <input
                    type="file"
                    placeholder="Select image"
                    onChange={(e) => setFile4(e.target.files[0])}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5 mt-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Upload Image 5
                  </label>
                  <input
                    type="file"
                    placeholder="Select image"
                    onChange={(e) => setFile5(e.target.files[0])}
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

export default FormLayout;
