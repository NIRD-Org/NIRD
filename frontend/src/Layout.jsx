import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Layout/Header";
import HeaderPGP from "./components/Layout/HeaderPGP";
import HeaderSOEPR from "./components/Layout/HeaderSOEPR";
import Footer from "./components/Layout/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTop from "./components/ScrollToTop";
import { useAuthContext } from "@/context/AuthContext";

function Layout() {
  const { user } = useAuthContext(); // Get user details from AuthContext
  const location = useLocation();

  // Check user roles and routes
  const isSOEPRRole = user?.role === 4 || user?.role === 5;
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isHomeRoute = location.pathname.startsWith("/soepr");
  const isMainRoute = location.pathname === "/";
  const isloginRoute = location.pathname === "/login";
  // Determine the header logic
  let headerToRender = null;

  if (isMainRoute|| isloginRoute) {
    // Display only the main header on the main route
    headerToRender = <Header />;
  } else {
    // Display HeaderSOEPR or HeaderPGP based on the given conditions
    headerToRender =
      (isAdminRoute && isSOEPRRole) ||
      (isAdminRoute && isSOEPRRole && isHomeRoute) ||
      isHomeRoute ? (
        <>
          <Header />
          <HeaderSOEPR />
        </>
      ) : (
        <>
          <Header />
          <HeaderPGP />
        </>
      );
  }

  return (
    <>
      {headerToRender}
      <ScrollToTop />
      <ScrollToTopButton />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
