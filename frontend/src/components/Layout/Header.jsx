import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="hidden lg:flex h-[14vh]  xl:h-[12vh] bg-primary w-full items-center justify-between">
        {/* Desktop navigation */}
        <div className="flex items-center justify-between w-[45%]">
          <NavLink to={"/"}>
            <img
              src="/logo/niti-logo-white.svg"
              alt="Ashoka Logo"
              className="h-full mt-4 w-[5rem]"
            />
          </NavLink>
          <NavLink
            to="/project"
            className={({ isActive }) =>
              `block px-3 text-md py-2 font-normal duration-200 ${
                isActive ? "text-white font-bold" : "text-gray-300"
              } hover:text-white`
            }
          >
            Project for Creating
            <br /> 250 Model GP Clusters
          </NavLink>
          <NavLink
            to="/kpi?tab=Localised+Sustainable+Goals"
            className={({ isActive }) =>
              `block px-3 text-md py-2 font-normal duration-200 ${
                isActive ? "text-white font-bold" : "text-gray-300"
              } hover:text-white`
            }
          >
            Key Performance
            <br /> Indicators (KPI)
          </NavLink>

          <NavLink
            to="/good-practices"
            className={({ isActive }) =>
              `block px-3 text-md py-2 font-normal duration-200 ${
                isActive ? "text-white font-bold" : "text-gray-300"
              } hover:text-white`
            }
          >
            Good Practices
          </NavLink>
        </div>

        <div className="px-3  flex justify-center items-center min-h-[14vh] xl:min-h-[12vh]  bg-white">
          <NavLink to={"/"}>
            <img
              src="/logo/nirdpr.png"
              alt="NIRDPR Logo"
              className="h-12 w-auto"
            />
          </NavLink>
        </div>

        <div className="flex justify-around">
          <NavLink
            to="/training"
            className={({ isActive }) =>
              `block px-3 text-md py-2 font-normal duration-200 ${
                isActive ? "text-white font-bold" : "text-gray-300"
              } hover:text-white`
            }
          >
            Training & Capacity
            <br /> Building
          </NavLink>
        </div>
        <NavLink
          to="/low-cost-voluntary-activities"
          className={({ isActive }) =>
            `block px-4 text-md py-2 font-normal duration-200 ${
              isActive ? "text-white font-bold" : "text-gray-300"
            } hover:text-white`
          }
        >
          Low cost Voluntary
          <br /> Activities
        </NavLink>

        <div>
          <img
            src="/logo/mopr.png"
            alt="MoPR Logo"
            className="h-12 scale-[1.8] w-full px-4"
          />
        </div>

        {!isAuthenticated ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `block px-3 text-md py-2 font-normal duration-200 ${
                isActive ? "text-white font-bold" : "text-gray-300"
              } hover:text-white`
            }
          >
            Login
          </NavLink>
        ) : (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `block px-3 text-md py-2 font-normal duration-200 ${
                isActive ? "text-white font-bold" : "text-gray-300"
              } hover:text-white`
            }
          >
            <Button variant="outline">Dashboard</Button>
          </NavLink>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="lg:hidden h-[10vh] bg-primary flex justify-between items-center">
        <div className="w-[10%]">
          <img
            src="/logo/niti-logo-white.svg"
            alt="Ashoka Logo"
            className="h-full mt-4 w-[5rem]"
          />
        </div>

        <div className="w-[28%] sm:w-[15%] z-50  bg-white">
          <NavLink to={"/"}>
            <img
              src="/logo/nirdpr.png"
              alt="NIRDPR Logo"
              className="min-h-[8vh]  md:min-h-[10vh] w-full"
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
          <div className="absolute top-[10vh]  left-0 w-full h-full bg-primary flex flex-col items-start pb-20 z-40">
            <div className="mt-4">
              <NavLink
                to="/project"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block px-3 text-start py-2 font-normal duration-200 ${
                    isActive ? "text-gray-300" : "text-white"
                  } hover:text-gray-300`
                }
              >
                Project for Creating
                <br /> 250 Model GP Clusters
              </NavLink>
              <NavLink
                to="/kpi?tab=Localised+Sustainable+Goals"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block px-3 text-start py-2 font-normal duration-200 ${
                    isActive ? "text-gray-300" : "text-white"
                  } hover:text-gray-300`
                }
              >
                Key Performance
                <br /> Indicators (KPI)
              </NavLink>
              <NavLink
                to="/low-cost-voluntary-activities"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block px-3 text-start py-2 font-normal duration-200 ${
                    isActive ? "text-gray-300" : "text-white"
                  } hover:text-gray-300`
                }
              >
                Low cost Voluntary
                <br /> Activities
              </NavLink>
              <NavLink
                to="/training"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block px-3  text-start py-2 font-normal duration-200 ${
                    isActive ? "text-gray-300" : "text-white"
                  } hover:text-gray-300`
                }
              >
                Training & Capacity
                <br /> Building
              </NavLink>
              <NavLink
                to="/good-practices"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block px-3 text-start py-2 font-normal duration-200 ${
                    isActive ? "text-gray-300" : "text-white"
                  } hover:text-gray-300`
                }
              >
                Good Practices
              </NavLink>
            </div>

            {!isAuthenticated ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block px-3 text-md py-2 font-normal duration-200 ${
                    isActive ? "text-white font-bold" : "text-gray-300"
                  } hover:text-white`
                }
              >
                Login
              </NavLink>
            ) : (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `block px-3 text-md py-2 font-normal duration-200 ${
                    isActive ? "text-white font-bold" : "text-gray-300"
                  } hover:text-white`
                }
              >
                <Button variant="outline">Dashboard</Button>
              </NavLink>
            )}

            <div className="flex-shrink-0">
              <img
                src="/logo/mopr.png"
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
