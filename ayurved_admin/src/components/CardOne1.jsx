import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

const CardOne = ({ item, type, fetchProducts }) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const PF = 'http://localhost:8080/images/';
  const handleUpdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handleDelete = async (id) => {
    const conf = confirm('Do you want delete this item ?');
    if (!conf) {
      return;
    }
    try {
      const res = await axios.delete(
        `${apiUrl}/api/product/delete-product/${id}`,
      );
      if (res.data) {
        // console.log('News deleted')
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-sm w-[100%] mx-auto border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
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
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-stroke dark:border-strokedark sm:grid-cols-4">
          <div className="hidden sm:flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
              <img
                src={PF + item.image}
                className="h-12 w-12 rounded-full object-cover bg-cover"
                alt="Brand"
              />
            </div>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">{item.title} ...</p>
          </div>

          <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-meta-3">{item.quantity}</p>
          </div>

          <div className="sm:items-center flex sm:justify-center sm:gap-4 ml-6 md:ml-0 py-2.5 sm:p-2.5 sm:flex xl:p-5">
            <button
              className="bg-meta-3 text-white mx-3 md:mx-0 sm:px-3 px-1 sm:py-2 rounded-sm"
              onClick={() => handleUpdate(item._id)}
            >
              <BiSolidEdit />
            </button>
            <button
              className="bg-danger text-white sm:px-3 px-1 sm:py-2 rounded-sm"
              onClick={() => handleDelete(item._id)}
            >
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
