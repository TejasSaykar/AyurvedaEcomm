import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useSelector } from "react-redux";

const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [review, setReview] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  console.log("Image : ", file.name);

  // const { token } = useSelector((state) => state.auth);

  // const headers = {
  //   Authorization: token,
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let product = {
      title,
      desc,
      category,
      price,
      review,
      file,
    };
    try {
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        product.image = filename;

        await axios.post(`${import.meta.env.VITE_BASE_URL}/upload/image`, data);
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/product/create-product`,
        { ...product }
      );
      if (data) {
        console.log("Product : ", data.product);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <Layout>
      <div className="bg-[#FBFADA] h-[90vh] mt-[4rem]">
        <div className="w-2/3 flex flex-col justify-center items-center mx-auto">
          <h2 className="text-center text-2xl font-bold py-4 text-[#12372A]">
            Create Food
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex bg-white px-5 roun py-8 flex-col gap-3"
          >
            <div className="flex justify-between gap-8">
              <label htmlFor="">Title :</label>
              <input
                type="text"
                className="py-2 rounded-md px-2 focus:outline-none ring-1 ring-gray-200"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex justify-between gap-8">
              <label htmlFor="">Description :</label>
              <input
                type="text"
                className="py-2 rounded-md px-2 focus:outline-none ring-1 ring-gray-200"
                placeholder="Description..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="flex justify-between gap-8">
              <label htmlFor="">Category :</label>
              <input
                type="text"
                className="py-2 rounded-md px-2 focus:outline-none ring-1 ring-gray-200"
                placeholder="Category..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="flex py-2">
              <label htmlFor="upload">
                Image :{" "}
                <span
                  className="ml-16 cursor-pointer px-4 py-2 text-white rounded-md bg-[#154333] hover:bg-transparent hover:text-[#12372A] hover:ring-1 hover:font-medium
                 ring-[#12372A]"
                >
                  Upload here
                </span>
              </label>
              <input
                id="upload"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              <div className="h-5 flex pl-1 gap-2 items-center justify-center text-center">
                {file && <h2>{file?.name}</h2>}
              </div>
            </div>
            <div className="flex justify-between gap-8">
              <label htmlFor="">Price : </label>
              <input
                type="text"
                className="py-2 rounded-md px-2 focus:outline-none ring-1 ring-gray-200"
                placeholder="Price..."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex justify-between gap-8">
              <label htmlFor="">Review :</label>
              <input
                type="text"
                className="py-2 rounded-md px-2 focus:outline-none ring-1 ring-gray-200"
                placeholder="Review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <button className="bg-[#12372A] text-white px-4 py-2 rounded-md">
              Create
            </button>
            <div className="h-5 py-2">
              {error && (
                <h2 className="text-center font-semibold text-red-600">
                  {error}
                </h2>
              )}
              {success && (
                <h2 className="text-center font-semibold text-green-500">
                  Food created successfully
                </h2>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
