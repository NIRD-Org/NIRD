import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAuthContext } from "@/context/AuthContext";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();
  console.log(user);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="hidden  lg:flex bg-[#004B86] w-full items-center justify-between">
        {/* Desktop navigation */}

        <div className="flex items-center justify-between  w-[55%] ">
          <NavLink to={"/"}>
            {" "}
            <img
              src="/logo/niti-logo-white.svg"
              alt="Ashoka Logo"
              className="h-full mt-4 w-[5rem]"
            />
          </NavLink>
          <NavLink
            to="/project"
            // to="/"
            className={({ isActive }) =>
              `block px-3  text-md py-2 font-normal duration-200 ${
                isActive ? " text-white font-bold" : "text-gray-300 "
              } hover:text-white`
            }
          >
            Project for Creating 250 Model GP Clusters
          </NavLink>
          <NavLink
            to="/kpi"
            className={({ isActive }) =>
              `block px-3  text-md py-2 font-normal duration-200 ${
                isActive ? " text-white font-bold" : "text-gray-300 "
              } hover:text-white`
            }
          >
            Key Performance Indicators (KPI)
          </NavLink>
          <NavLink
            to="/voluntary"
            className={({ isActive }) =>
              `block px-3  text-md py-2 font-normal duration-200 ${
                isActive ? " text-white font-bold" : "text-gray-300 "
              } hover:text-white`
            }
          >
            Low cost Voluntary Activities
          </NavLink>
        </div>

        <div className="px-3 w-[10%] flex justify-center items-center min-h-[12vh] max-h-[15vh] bg-white">
          <NavLink to={"/"}>
            <img
              src="/logo/nirdpr.png"
              alt="NIRDPR Logo"
              className="h-12 w-auto"
            />
          </NavLink>
        </div>
        <div className="flex justify-between w-[30%]">
          <NavLink
            to="/training"
            className={({ isActive }) =>
              `block px-3  text-md py-2 font-normal duration-200 ${
                isActive ? " text-white font-bold" : "text-gray-300 "
              } hover:text-white`
            }
          >
            Training & Capacity Building
          </NavLink>
          <NavLink
            to="/practices"
            className={({ isActive }) =>
              `block px-3  text-md py-2 font-normal duration-200 ${
                isActive ? " text-white font-bold" : "text-gray-300 "
              } hover:text-white`
            }
          >
            Good Practices
          </NavLink>
        </div>
        <div className="flex-shrink-0">
          <img
            src="/logo/MOPR-NEW-LOGO.png"
            alt="MoPR Logo"
            className="h-12 w-auto"
          />
        </div>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `block px-3  text-md py-2 font-normal duration-200 ${
              isActive ? " text-white font-bold" : "text-gray-300 "
            } hover:text-white`
          }
        >
          Login
        </NavLink>
      </div>

      {/* Mobile navigation */}

      <div className="lg:hidden  bg-[#004B86] flex justify-between items-center">
        <div className="w-[10%]">
          <img
            src="src\assets\images\logo\nirdpr.png"
            alt="NIRDPR Logo"
            className="h-12 w-auto"
          />
        </div>
        <div className="w-[20%] h-max bg-white">
          <NavLink to={"/"}>
            <img
              src="/logo/nirdpr.png"
              alt="NIRDPR Logo"
              className="h-12 w-full"
            />
          </NavLink>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-white w-[10%] focus:outline-none"
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
