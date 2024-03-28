import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <div>
      <header className="fixed top-0 z-10 w-full bg-white">
        <Navbar />
      </header>
      <main className={`${location.pathname === "/" ? "mt-56" : "mt-[8rem]"}`}>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
