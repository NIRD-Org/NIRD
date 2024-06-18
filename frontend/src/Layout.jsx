import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTop from "./components/ScrollToTop";

function Layout() {
  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
