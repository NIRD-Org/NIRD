import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="hidden md:flex bg-[#004B86] w-full p-4  items-center justify-between">
        {/* Desktop navigation */}

        <div className="">
          <img
            src="src\assets\images\logo\nirdpr.png"
            alt="NIRDPR Logo"
            className="h-12 w-auto"
          />
        </div>
        <div className="flex justify-around  text-white">
          <NavLink
            //   to="/project"
            to="/"
            className={({ isActive }) =>
              `block px-3 text-center text-sm py-2 font-normal duration-200 ${
                isActive ? " text-white font-bold" : "text-gray-300 "
              } hover:text-white`
            }
          >
            Project for Creating 250 Model GP Clusters
          </NavLink>
          <NavLink
            to="/kpi"
            className={({ isActive }) =>
              `block px-3 text-center text-sm py-2 font-normal duration-200 ${
                isActive ? " text-white font-bold" : "text-gray-300 "
              } hover:text-white`
            }
          >
            Key Performance Indicators (KPI)
          </NavLink>
          <NavLink
            to="/voluntary"
            className={({ isActive }) =>
              `block px-3 text-center text-sm py-2 font-normal duration-200 ${
                isActive ? " text-white font-bold" : "text-gray-300 "
              } hover:text-white`
            }
          >
            Low cost Voluntary Activities
          </NavLink>
          <NavLink
            to="/training"
            className={({ isActive }) =>
              `block px-3 text-center text-sm py-2 font-normal duration-200 ${
                isActive ? " text-white font-bold" : "text-gray-300 "
              } hover:text-white`
            }
          >
            Training & Capacity Building
          </NavLink>
          <NavLink
            to="/practices"
            className={({ isActive }) =>
              `block px-3 text-center text-sm py-2 font-normal duration-200 ${
                isActive ? " text-white font-bold" : "text-gray-300 "
              } hover:text-white`
            }
          >
            Good Practices
          </NavLink>
        </div>
        <div className="flex-shrink-0">
          <img
            src="src\assets\images\logo\MOPR-NEW-LOGO.png"
            alt="MoPR Logo"
            className="h-12 w-auto"
          />
        </div>
        <div className="flex-shrink-0 text-white">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `block px-3 text-center text-sm py-2 font-normal duration-200 ${
                isActive ? " text-white font-bold" : "text-gray-300 "
              } hover:text-white`
            }
          >
            Login
          </NavLink>
        </div>
      </div>
      {/* Mobile navigation */}

      <div className="md:hidden  bg-[#004B86] p-4 flex justify-between items-center">
        <div className="flex-shrink-0">
          <img
            src="src\assets\images\logo\nirdpr.png"
            alt="NIRDPR Logo"
            className="h-12 w-auto"
          />
        </div>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
        {isOpen && (
          <div className="absolute top-20 left-0 w-full h-full bg-[#004B86] flex flex-col items-start pb-20 z-20">
            <div className="mt-4">
              <NavLink
                to="/project"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block px-3 text-start py-2 font-normal duration-200 ${
                    isActive ? " text-gray-300" : "text-white "
                  } hover:text-gray-300`
                }
              >
                Project for Creating 250 Model GP Clusters
              </NavLink>
              <NavLink
                to="/kpi"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block px-3 text-start py-2 font-normal duration-200 ${
                    isActive ? " text-gray-300" : "text-white "
                  } hover:text-gray-300`
                }
              >
                Key Performance Indicators (KPI)
              </NavLink>
              <NavLink
                to="/voluntary"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block px-3 text-start py-2 font-normal duration-200 ${
                    isActive ? " text-gray-300" : "text-white "
                  } hover:text-gray-300`
                }
              >
                Low cost Voluntary Activities
              </NavLink>
              <NavLink
                to="/training"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block px-3 text-start py-2 font-normal duration-200 ${
                    isActive ? " text-gray-300" : "text-white "
                  } hover:text-gray-300`
                }
              >
                Training & Capacity Building
              </NavLink>
              <NavLink
                to="/practices"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block px-3 text-start py-2 font-normal duration-200 ${
                    isActive ? " text-gray-300" : "text-white "
                  } hover:text-gray-300`
                }
              >
                Good Practices
              </NavLink>
            </div>
            <div className="mt-auto mb-4">
              <NavLink
                to="/login"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block px-3 text-start py-2 font-normal duration-200 ${
                    isActive ? " text-gray-300" : "text-white "
                  } hover:text-gray-300`
                }
              >
                Login
              </NavLink>
            </div>
            <div className="flex-shrink-0">
              <img
                src="src\assets\images\logo\MOPR-NEW-LOGO.png"
                alt="MoPR Logo"
                className="h-12 w-auto"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
