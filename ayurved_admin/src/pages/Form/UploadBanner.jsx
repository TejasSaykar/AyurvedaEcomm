import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadBanner = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bannerImage) {
      setError('File is required!');
      return;
    } else {
      const banner = {
        bannerImage,
      };

      const data = new FormData();
      const filename = Date.now() + bannerImage.name;
      data.append('name', filename);
      data.append('file', bannerImage);
      banner.bannerImage = filename;

      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/upload/image`, data);
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/banner/upload-banner`,
          { bannerImage: banner.bannerImage },
        );
        if (data) {
          // console.log('Upload Banner : ', data);
          setBannerImage('');
          navigate('/banner');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Breadcrumb pageName="Upload Banner Image" />
      <div className="w-full">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Upload Banner Image
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      {/* Email <span className="text-meta-1">*</span> */}
                      Banner Image
                    </label>
                    <input
                      type="file"
                      placeholder="Enter category"
                      // value={bannerImage}
                      onChange={(e) => setBannerImage(e.target.files[0])}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium cursor-pointer outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Upload Banner Image
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadBanner;
