import React, { useState, useEffect } from "react";
import { FaSearch, FaVolumeUp, FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

const MenuItem = ({ label, to, submenus, isProjectMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId);
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
          } bg-primary text-white text-sm rounded shadow-md z-20 p-4`}
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
  const { isAuthenticated } = useAuthContext();
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      label: "The Project",
      to: "/pgp",
      isProjectMenu: true,
      submenus: [
        { label: "Project Overview", to: "/project" },
        { label: "Project Execution Team", to: "/ExecutionTeam" },
        { label: "Key Partners", to: "/KeyPartners" },
        { label: "Institutional Strengthening", to: "/institutional-strengthening" },
        { label: "Themes", to: "/themes" },
        { label: "Young Fellows and Activities", to: "/YFActivities" },
        { label: "Indicators and KPIs", to: "/indicators-kpis" },
        { label: "Budget and Expenditure", to: "/budget-expenditure" },
        { label: "Good Practices", to: "/good-practices" },
        { label: "Low Cost/No Cost Activities", to: "/low-cost-activities" },
      ],
    },
    { label: "Project Progress", to: "/kpi?tab=Localised+Sustainable+Goals" },
    { label: "GP Profile", to: "/gp-profile/details" },
    {
      label: "Notifications and Reports",
      submenus: [
        { label: "Circulars and Orders", to: "/circulars-orders" },
        { label: "Careers", to: "/careers" },
        {
          label: "Reports and Formats",
          submenus: [
            { label: "GPDP Models", to: "/gpdp-models" },
            { label: "Quick Links", to: "/quick-links" },
            { label: "YF Support Material", to: "/yf-support-material" },
          ],
        },
      ],
    },
    {
      label: "OSR", to: "/OSR" 
     
    },
    { label: "Grievance Cell", to: "/grievance-cell" },
    { label: "Contact Us", to: "/contact-us" },
  ];

  return (
    <header>
      {/* Top Section (White background) */}
      <div className="flex flex-wrap items-center justify-between bg-white px-6 py-4">
        {/* Left Section: Project Title and Logo */}
        <div className="flex items-center space-x-4">
          <NavLink to={"/"}>
            <img
              src="/logo/ProjectLogo.jpg"
              alt="Project Logo"
              className="h-16 sm:h-20 object-contain"
            />
          </NavLink>
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold leading-tight">
              Project for Creating<br />
              250 Model GP Clusters
            </h1>
          </div>
        </div>

        {/* Right Section: Logos */}
        <div className="flex items-center justify-center space-x-4">
          <img
            src="/logo/ashoka.png"
            alt="Indian Emblem"
            className="h-8 sm:h-10 md:h-12 lg:h-16 object-contain"
          />
          <img
            src="/logo/nirdpr.png"
            alt="NIRDPR Logo"
            className="h-8 sm:h-10 md:h-12 lg:h-16 object-contain"
          />
          <img
            src="/logo/moprlogo.png"
            alt="MoPR Logo"
            className="h-8 sm:h-10 md:h-12 lg:h-16 object-contain"
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex justify-between items-center py-4">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
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
