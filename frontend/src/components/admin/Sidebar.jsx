import React from "react";
import { Link } from "react-router-dom";
import { sidebarItems } from "@/lib/data";

function Sidebar({ className }) {
  return (
    <aside
      aria-label="sidebar "
      aria-controls="default-sidebar"
      className={`${className} scrollbar bg-white font-urbanist min-w-[200px] px-6  shadow-md rounded-md `}
    >
      <div className="pt-10 hover:text-slate-100 text-slate-600">
        <Link
          to="/"
          className="flex  items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-main  transition duration-150 cursor-pointer"
        ></Link>
      </div>

      <div className="wrapper pt-6">
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={item.title}>
              <Link
                to={item.link}
                className={`flex mb-4 items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-[#004B86]/70 hover:text-white transition duration-150 cursor-pointer`}
              >
                <item.icon />
                <span className="ml-8  text-[0.9rem] font-semibold  tracking-wider">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
          
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
