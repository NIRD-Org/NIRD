import React, { useState, useEffect } from "react";
import { FaSearch, FaVolumeUp, FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa"; // Using FontAwesome icons
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
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

  const menuItems = [
    {
      label: "The Project",
      isProjectMenu: true,
      submenus: [
        { label: "Project Overview", to: "/project" },
        { label: "Schools of Excellence", to: "/schoolsofExcellence" }, 
        { label: "Project Execution Team", to: "/ExecutionTeam" },  
        { label: "Budget and Expenditure", to: "/budget-expenditure" },
        { label: "Key Partners", to: "/KeyPartners" },
        { label: "KPI List", to: "/kpis" }, 
      ],
    },
    { label: "Project Progress", to: "/kpi?tab=Localised+Sustainable+Goals" },
    {
      label: "Notifications and Reports",
      submenus: [
        { label: "Circulars and Orders", to: "/circulars-orders" },
        { label: "Careers", to: "/careers" },
        {
          label: "Achievements",
          submenus: [
            { label: "case Studies", to: "/case-studies" },
            { label: "Photo Gallery", to: "/photo-gallery" },
           
          ],
        },
      ],
    },
    { label: "Performance Evaluation", 
      
      
      submenus: [
       { label: "Ranking", to: "/quick-links" },
        
      ],},
    { label: "Grievance Cell", to: "/grievance-cell" },
    { label: "Contact Us", to: "/contact-us" },
  ];

  return (
    <header>
     

      {/* Top Section (White background) */}
      <div className="flex items-center justify-between bg-white px-6 py-4">
        <div className="flex items-center">
        <NavLink to={"/soepr"}>
          <img
            src="/logo/SoEPR.png"
            alt="Project Logo"
            className="h-20 mr-1 mb-0 mt-0"
          />
          </NavLink>
          <div>
            <h1 className="text-3xl font-bold leading-tight">
              School of EXCELLENCE<br />
              Panchayati Raj (SOEPR)
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <img
            src="/logo/ashoka.png"
            alt="Indian Emblem"
            className="h-12"
          />
          <img
            src="/logo/nirdpr.png"
            alt="NIRDPR Logo"
            className="h-12"
          />
          <img
            src="/logo/mopr.png"
            alt="MoPR Logo"
            className="h-12"
          />
        </div>
      </div>

      {/* Menu Bar (Blue background) */}
      <nav className="bg-primary text-white">
        <div className="container mx-auto px-6">
          <ul className="hidden lg:flex items-center justify-center space-x-6 py-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <MenuItem {...item} />
              </li>
            ))}
          </ul>

          <div className="lg:hidden flex justify-between items-center py-4">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>

          {isOpen && (
            <div className="lg:hidden bg-primary text-white p-6 space-y-4">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <NavLink
                    to={item.to}
                    onClick={toggleMenu}
                    className="block px-4 py-2"
                  >
                    {item.label}
                  </NavLink>
                  {item.submenus && (
                    <ul className="ml-4">
                      {item.submenus.map((submenu, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={submenu.to}
                            onClick={toggleMenu}
                            className="block px-4 py-2"
                          >
                            {submenu.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
