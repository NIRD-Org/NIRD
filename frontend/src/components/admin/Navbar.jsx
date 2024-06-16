import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { NirdHamIcon } from "./Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowBigRight } from "lucide-react";
function Navbar() {
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
          title: "Access Management",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Create User",
          link: "/admin/users/create",
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
        /*  {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Kpi approvals",
          link: "/admin/kpi-approvals",
        }, */
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
          title: "Attendance",
          link: "/admin/attendance",
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
      ];
      break;
  }
  
  return (
    <>
      <header className="z-[3] w-full gap-4 h-16 rounded-md shadow-md bg-white flex items-center px-6 justify-between">
        <div></div>
        <div className="flex items-center gap-3">
          <div>
            <h2>
              {user?.role == 1
                ? "Superadmin"
                : user?.role == 2
                ? "Admin"
                : user?.role == 3
                ? "Young Fellow"
                : ""}
            </h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <NirdHamIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-primary text-slate-100 rounded-none mt-2 w-60"
            >
              <DropdownMenuItem>Change Password</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Change Mobile Number</DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="md:hidden">
                {sidebarItems.map((item) =>
                  item.type === "module" ? (
                    <div key={item.title}>
                      <div className="flex bg-primary text-slate-100 mb-1  items-center px-4 py-3 w-full cursor-not-allowed font-semibold">
                        <span className="ml-4 text-[0.8rem] tracking-wider">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div key={item.title}>
                      <Link
                        to={item.link}
                        className="flex mb-2 px-2 mx-6 items-center  py-2 rounded-xl text-slate-100 hover:bg-[#004B86]/70 hover:text-white transition duration-150 cursor-pointer"
                      >
                        <item.icon size={20} />
                        <span className="ml-4 text-[0.7rem] font-semibold tracking-wider">
                          {item.title}
                        </span>
                      </Link>
                    </div>
                  )
                )}
              </div>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}

export default Navbar;
