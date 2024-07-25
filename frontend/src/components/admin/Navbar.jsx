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
import { getSidebarItems } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Navbar() {
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarItems = getSidebarItems(user);

  return (
    <>
      <header className="z-[3] w-full gap-4 h-16 rounded-md shadow-md bg-white flex items-center px-6 justify-between">
        <div></div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <h2>{user?.name}</h2>
            <h2>
              (
              {user?.role == 1
                ? "Superadmin"
                : user?.role == 2
                ? "Admin"
                : user?.role == 3
                ? "Young Fellow"
                : ""}
              )
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
              <Link to="/admin/change-password">
                <DropdownMenuItem>Change Password</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Change Mobile Number</DropdownMenuItem>
              <DropdownMenuSeparator className="md:hidden" />
              <Accordion
                type="single"
                collapsible
                className=" list-none md:hidden"
              >
                {sidebarItems &&
                  sidebarItems.length > 0 &&
                  sidebarItems?.map((item, index) => (
                    <AccordionItem value={index + 1}>
                      <AccordionTrigger className="flex bg-primary text-slate-100 mb-1 items-center px-4 py-3 w-full font-semibold">
                        <span className="ml-4 text-[0.8rem] tracking-wider">
                          {item.title}
                        </span>
                      </AccordionTrigger>
                      {item.submodules && (
                        <AccordionContent>
                          {item.submodules.map((subItem) => (
                            <li key={subItem.title}>
                              <Link
                                to={subItem.link}
                                className="flex mb-2 no-underline px-2 mx-6 items-center py-2 rounded-xl text-slate-200 hover:bg-[#004B86]/70 hover:text-white transition duration-150 cursor-pointer"
                              >
                                <subItem.icon size={20} />
                                <span className="ml-4 text-[0.7rem] font-semibold tracking-wider">
                                  {subItem.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </AccordionContent>
                      )}
                    </AccordionItem>
                  ))}
              </Accordion>
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
