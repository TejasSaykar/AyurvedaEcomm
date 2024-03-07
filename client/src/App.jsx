import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Create from "./pages/Create";
import Cart from "./pages/Cart";
import { useEffect } from "react";
import ShopByCat from "./pages/ShopByCat";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TermsConditions from "./pages/TermsConditions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import { useSelector } from "react-redux";
import PlaceOrder from "./pages/PlaceOrder";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<ProductDetail />} />
        <Route path="/create" element={<Create />} />
        <Route
          path="/cart"
          element={
            <IsLogin>
              <Cart />
            </IsLogin>
          }
        />
        <Route path="/shop-by-cat/:slug" element={<ShopByCat />} />

        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Orders */}
        <Route
          path="/orders"
          element={
            <IsLogin>
              <Orders />
            </IsLogin>
          }
        />

        <Route
          path="/place-order"
          element={
            <IsLogin>
              <PlaceOrder />
            </IsLogin>
          }
        />
      </Routes>
    </>
  );
}

export function IsLogin(props) {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default App;
