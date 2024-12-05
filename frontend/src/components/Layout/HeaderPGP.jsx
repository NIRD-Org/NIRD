import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAuthContext } from "@/context/AuthContext";

const MenuItem = ({ label, to, submenus, isProjectMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout.current); // Clear any existing timeout
    setIsOpen(true); // Open the menu
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false); // Close the menu after a delay
    }, 150); // Adjust the delay time (150ms)
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} // Close menu with delay
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
  const menuRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the menu when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const menuItems = [
    {
      label: "The Project",
      to: "/pgp",
      isProjectMenu: true,
      submenus: [
        { label: "Project Overview", to: "/project" },
        { label: "Project Execution Team", to: "/projectstaff" },
        { label: "Project Partners", to: "/KeyPartners" },
        { label: "Institutional Strengthening", to: "/institutional-strengthening" },
        { label: "Themes", to: "/project-themes" },
        { label: "Young Fellows and Activities", to: "/YFActivities" },
        { label: "Indicators and KPIs", to: "/indicators-kpis" },
        { label: "Budget and Expenditure", to: "/budget-expenditure" },
      ],
    },
    {
      label: "Project Progress",to: "/pgp",
      submenus: [
        { label: "Major project Interventions", to: "/MPI" },
        { label: "Indicators and KPIs", to: "/kpi?tab=Localised+Sustainable+Goals" },
        { label: "Good Practices", to: "/good-practices" },
        { label: "Low Cost/No Cost Activities", to: "/low-cost-voluntary-activities" },
        { label: "Training", to: "/training" },
        { label: "Achievements", to: "/Achievements" },
        { label: "GramSabhaProgress", to: "/GramSabha" },
      ],
    },
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
    { label: "OSR", to: "/OSR" },
    { label: "Grievance Cell", to: "/grievance-cell" },
    { label: "Contact Us", to: "/Contactpgp" },
  ];

  return (
    <header>
      {/* Top Section */}
      <div className="flex flex-wrap items-center justify-between bg-white px-6 py-4">
        <div className="flex items-center space-x-4">
          <NavLink to={"/pgp"}>
            <img
              src="/logo/ProjectLogo.jpg"
              alt="Project Logo"
              className="h-16 sm:h-20 object-contain"
            />
          </NavLink>
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold leading-tight">
              Project for Creating<br />
              250 Model GP Clusters across India
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
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

      {/* Menu Bar */}
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
            <div ref={menuRef} className="lg:hidden bg-primary text-white p-6 space-y-4">
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
