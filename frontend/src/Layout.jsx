import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Layout/Header";
import HeaderPGP from "./components/Layout/HeaderPGP";
import HeaderSOEPR from "./components/Layout/HeaderSOEPR";
import Footer from "./components/Layout/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTop from "./components/ScrollToTop";
import { useAuthContext } from "@/context/AuthContext";


  return (
    <>
       <Header />
       <HeaderPGP />
      <ScrollToTop />
      <ScrollToTopButton />
      <Outlet />
      <Footer />
    </>
  );


export default Layout;
