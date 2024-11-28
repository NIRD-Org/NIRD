import React, { useState, useEffect } from "react";
import { FaHome, FaSearch, FaVolumeUp, FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa"; // Using FontAwesome icons

import { NavLink } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext"; // Assuming this provides authentication context
import { Button } from "../ui/button"; // Assuming Button component is available

const MenuItem = ({ label, to, submenus, isProjectMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId); // Cancel any pending close operation
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Delay closing to allow time for cursor to move
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
  }, []);

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink to={to} className="block px-4 py-2 hover:text-gray-300">
        {label}
      </NavLink>
      {submenus && isOpen && (
        <div
          className={`absolute left-0 mt-2 ${
            isProjectMenu ? "grid grid-cols-2 gap-x-8 w-[400px]" : "flex flex-col"
          } bg-primary text-white text-sm rounded shadow-md z-20 p-4`} // z-20 ensures it's above everything else
        >
          {submenus.map((submenu, index) => (
            <NavLink
              key={index}
              to={submenu.to}
              className="block px-4 py-1 hover:bg-gray-700"
            >
              {submenu.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthContext(); // Track authentication state
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language is English
  const toggleMenu = () => setIsOpen(!isOpen);

  // Google Translate Initialization Function
  const initializeGoogleTranslate = () => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en", // Default language is English
            includedLanguages: "hi,bn,ta,te,ml,gu,kn,pa,mar", // Major Indian languages (Hindi, Bengali, Tamil, etc.)
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false, // Prevent auto-display, we will handle the language selection
          },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  };

  // Trigger language change
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);

    if (window.google && window.google.translate) {
      const translateInstance = new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "hi,bn,ta,te,ml,gu,kn,pa,mar", // Only Indian languages
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
      translateInstance.showBanner(false); // Hide the default Google banner
    }
  };

  useEffect(() => {
    initializeGoogleTranslate(); // Initialize Google Translate when component mounts
  }, []);

  
  return (
    <header>
      <div className="bg-lightgray px-4 py-2 flex justify-between items-center space-x-4">
       {/*<div className="flex items-center space-x-2">
          <FaSearch size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-1 bg-white text-gray-800 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        <div className="flex items-center space-x-2">
        <NavLink
            to="/">
        <FaHome className="mr-4 text-2xl align-middle" />
           
          </NavLink>  
        </div> 

        <div className="flex items-center space-x-2">
        <button
          onClick={() => handleLanguageChange("hi")}
          className="bg-[#F0F4F8] text-blue-600 underline font-bold text-2xl p-2 rounded-md cursor-pointer h-[38px] w-[150px] text-gray-700 text-sm"
        >
          Translate Page
        </button> 
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="flex items-center space-x-1"
            >
              <FaSignInAlt size={20} />
              <b>Login</b>
            </NavLink>
          ) : (
            <NavLink
              to="/admin"
              className="flex items-center space-x-1 text-white"
            >
              <Button variant="outline">Dashboard</Button>
            </NavLink>
          )}
        </div>
      </div>

     

     
    </header>
  );
};

export default Header;
