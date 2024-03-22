import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
const Orders = () => {
  const [status, setStatus] = useState([
    'Not Process',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancel',
  ]);
  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState([]);

  const apiUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiUrl}/api/auth/orders`);
      if (data) {
        console.log('Admin Orders : ', data);
        setOrders(data.orders);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order._id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);

    axios
      .put(`${apiUrl}/api/auth/update-status/${orderId}`, { status: newStatus })
      .then((response) => {
        console.log('Order status updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  };

  const handleDelete = async (id) => {
    const conf = confirm('Do you want delete this item ?');
    if (!conf) {
      return;
    }
    try {
      const { data } = await axios.delete(
        `${apiUrl}/api/auth/delete-order/${id}`,
      );
      if (data) {
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    <h2 className="text-center text-2xl">Loading...</h2>;
    return;
  }

  return (
    <>
      {orders.length < 1 && (
        <h1 className="text-2xl w-full font-bold text-center pt-20">
          No Orders to preview
        </h1>
      )}
      <div className="rounded-sm w-full mx-auto border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            {/* <div className="hidden sm:block p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Image
            </h5>
          </div> */}
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Status
              </h5>
            </div>
            <div className="hidden md:block p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Order Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Buyer Name
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Location
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Flat No
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {orders?.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-2 md:grid-cols-6 border-b border-stroke dark:border-strokedark sm:grid-cols-4"
            >
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold pl-1">{order.status}</p>
                  <select
                    value={order.status}
                    className="text-base dark:bg-graydark px-2 py-2 rounded-sm ring-1 ring-bodyz font-light cursor-pointer focus:outline-none"
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    {status.map((s) => (
                      <option className="px-2 py-3" key={order._id} value={s}>
                        {s}
                      </option>
                    ))}
                    {/* <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option> */}
                  </select>
                </div>
              </div>

              <div className="sm:flex hidden items-center overflow-x-scroll gap-3 w-[230px] justify-center p-2.5 xl:p-5">
                {order?.products?.map((p) => (
                  <p className="text-meta-3 hidden md:block text-sm">
                    {p?.title}
                  </p>
                ))}
              </div>

              <div className="sm:flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{order?.fullname}</p>
              </div>

              <div className="sm:flex hidden items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{order?.address}</p>
              </div>

              <div className="sm:flex hidden items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{order?.flatNo}</p>
              </div>

              {/* <div className="hidden sm:flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0 flex gap-1 py-2 scroll-container overflow-x-scroll w-[150px] md:w-[200px]">
                {order?.products?.map((product) => (
                  <img
                    src={`http://localhost:8181/images/${product?.image}`}
                    className="h-10 w-10 rounded-full object-cover bg-cover"
                    alt="Brand"
                  />
                ))}
              </div>
            </div> */}

              <div className="hidden sm:items-center md:flex sm:justify-center sm:gap-4 ml-6 md:ml-8 py-2.5 sm:p-2.5 sm:flex xl:p-5">
                <button
                  className="bg-danger text-white sm:px-3 px-1 sm:py-2 rounded-sm"
                  onClick={() => handleDelete(order._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
