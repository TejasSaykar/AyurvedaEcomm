import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

const CardOne = ({ item, type, fetchCategories }) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const PF = 'http://localhost:8181/images/';
  const handleUpdate = (id) => {
    navigate(`/update-category/${id}`);
  };

  const handleDelete = async (id) => {
    const conf = confirm('Do you want delete this item ?');
    if (!conf) {
      return;
    }
    try {
      const res = await axios.delete(
        `${apiUrl}/api/category/delete-category/${id}`,
      );
      if (res.data) {
        // console.log('News deleted');
        // window.location.reload();
        type === 'category' ? fetchCategories() : fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-sm wfull mx-auto border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-2 md:grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-4">
          {/* <div className="hidden sm:flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
              <img
                src={PF + item.file}
                className="h-12 w-12 rounded-full object-cover bg-cover"
                alt="Brand"
              />
            </div>
          </div> */}

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">{item.name}</p>
          </div>

          <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
            <img
              className="text-meta-3 w-12 object-cover bg-cover h-14"
              src={`http://localhost:8181/images/${item.img}`}
            />
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
