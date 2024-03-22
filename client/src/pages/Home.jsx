import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { Carousel } from "react-responsive-carousel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Popup from "./Popup";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
    autoplay: true,
    duration: 1000,
    cssEase: "ease-in-out",
    fade: true,
  };

  useEffect(() => {
    const fetchCat = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-categories`
      );
      if (data) {
        console.log("Categories : ", data);
        setCategories(data.categories);
      }
    };
    fetchCat();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/product/get-user-product`
      );
      if (data) {
        setProducts(data.product);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/banner/get-banners`
        );
        if (data) {
          setBanners(data.banners);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBanners();
  }, []);

  return (
    <Layout>
      <div className="w-full px-4 md:px-10 mt-10">
        <div className="top h-full w-full" style={{ height: "500px" }}>
          <Slider {...settings}>
            {banners.map((b) => (
              <div className="slick-slide w-full h-full flex">
                <img
                  src={`http://localhost:8181/images/${b.bannerImage}`}
                  className="w-full h-[500px] object-cover aspect-video -z-10"
                  alt=""
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="products mt-10">
          <div>
            <h2 className="text-2xl font-semibold my-8">Popular Products</h2>
            <Link className="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 xl:grid-cols-5 gap-4">
              {products?.slice(0, 10).map((product) => (
                <Link
                  to={`/details/${product._id}`}
                  key={product._id}
                  className="bg-gray-200/30 relative cursor-pointer rounded-xl p-4 flex flex-col gap-1"
                >
                  {product.quantity < 1 && (
                    <span className="absolute text-sm font-semibold bg-yellow-400 p-1 pr-2 rounded-r-full">
                      Out Of Stock
                    </span>
                  )}
                  <img
                    src={`http://localhost:8181/images/${product.image}`}
                    className="xl:bg-transparent aspect-square bg-cover object-cover"
                    alt=""
                  />
                  <h2>{product.title}</h2>
                  <p>
                    from <span>₹{product.price}</span>
                  </p>
                  <div className="flex gap-1 items-center text-emerald-500">
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStarHalf />
                    <span>(159)</span>
                  </div>
                </Link>
              ))}
            </Link>
          </div>
        </div>

        <div className="w-full mt-10 mb-8">
          <div>
            <h2 className="my-8 text-2xl font-semibold">Popular Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {categories.slice(0, 6).map((cat) => (
                <div>
                  <img
                    onClick={() => navigate(`/shop-by-cat/${cat.name}`)}
                    src={`http://localhost:8181/images/${cat.img}`}
                    className="rounded-full w-2/3 md:w-full mx-auto cursor-pointer hover:transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                    alt=""
                  />
                </div>
              ))}
              {/* <div>
                <img
                  src="/img/cat2.webp"
                  className="rounded-full w-2/3 md:w-full mx-auto cursor-pointer hover:transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="/img/cat3.webp"
                  className="rounded-full w-2/3 md:w-full mx-auto cursor-pointer hover:transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="/img/cat4.webp"
                  className="rounded-full w-2/3 md:w-full mx-auto cursor-pointer hover:transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="/img/cat5.webp"
                  className="rounded-full w-2/3 md:w-full mx-auto cursor-pointer hover:transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="/img/cat6.webp"
                  className="rounded-full w-2/3 md:w-full mx-auto cursor-pointer hover:transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                  alt=""
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
