import React from "react";
import { Link } from "react-router-dom";
import { ArrowBigRight } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";

function Sidebar({ className }) {
  const { user } = useAuthContext();

  let sidebarItems;
  switch (user.role) {
    case 1:
      sidebarItems = [
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Access Management",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Create User",
          link: "/admin/users/create",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "User location",
          link: "/admin/users/all",
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Master",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "States",
          link: "/admin/states",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Districts",
          link: "/admin/districts",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Blocks",
          link: "/admin/blocks",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Gram Panchayats",
          link: "/admin/gram-panchayats",
        },
      ];
      break;
    case 2:
      sidebarItems = [
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Attendance",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "All Attendance",
          link: "/admin/attendance/attendance",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "AM Entry Form",
          link: "/admin/attendance/amu-upload",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "PM Entry Form",
          link: "/admin/attendance/pmu-upload",
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Access Management",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Create User",
          link: "/admin/users/create",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "User location",
          link: "/admin/users/all",
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Master",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Themes",
          link: "/admin/themes",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "KPI",
          link: "/admin/data-point",
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Young Fellow",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Action Form",
          link: "/admin/admin-action-form",
        },
      ];
      break;
    case 3:
      sidebarItems = [
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Attendance",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "All Attendance",
          link: "/admin/attendance/attendance",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "AM Entry Form",
          link: "/admin/attendance/amu-upload",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "PM Entry Form",
          link: "/admin/attendance/pmu-upload",
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Young Fellow",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Themewise KPI",
          link: "/admin/young-professionals",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Indicator",
          link: "/admin/indicator/create",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Action Form",
          link: "/admin/action-form",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "GP Details",
          link: "/admin/gp-details-form",
        },
      ];
      break;
  }

  return (
    <aside
      aria-label="sidebar "
      aria-controls="default-sidebar"
      className={`${className} bg-slate-100 scrollbar  font-urbanist  shadow-md rounded-md  z-[20]`}
    >
      <div className="pt-10 hover:text-slate-100 text-slate-600">
        <Link
          to="/"
          className="flex  items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-main  transition duration-150 cursor-pointer"
        ></Link>
      </div>

      <div className="pt-6 w-max">
        <ul>
          {sidebarItems.map((item, index) =>
            item.type === "module" ? (
              <li key={item.title}>
                <div className="flex bg-primary text-slate-100 mb-1  items-center px-4 py-3 w-full cursor-not-allowed font-semibold">
                  {/* <item.icon size={20} /> */}
                  <span className="ml-4 text-[0.8rem] tracking-wider">
                    {item.title}
                  </span>
                </div>
              </li>
            ) : (
              <li key={item.title}>
                <Link
                  to={item.link}
                  className="flex mb-2 px-2 mx-6 items-center  py-2 rounded-xl text-slate-700 hover:bg-[#004B86]/70 hover:text-white transition duration-150 cursor-pointer"
                >
                  <item.icon size={20} />
                  <span className="ml-4 text-[0.7rem] font-semibold tracking-wider">
                    {item.title}
                  </span>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
