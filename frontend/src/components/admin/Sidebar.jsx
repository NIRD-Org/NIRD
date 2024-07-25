import React from "react";
import { Link } from "react-router-dom";
import { ArrowBigRight } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { getSidebarItems } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Sidebar({ className }) {
  const { user } = useAuthContext();

  const sidebarItems = getSidebarItems(user);
  return (
    <aside
      aria-label="sidebar "
      aria-controls="default-sidebar"
      className={`${className} bg-slate-100 scrollbar w-[250px] font-urbanist  shadow-md rounded-md  z-[20]`}
    >
      <div className="pt-10 hover:text-slate-100 text-slate-600">
        <Link
          to="/"
          className="flex  items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-main  transition duration-150 cursor-pointer"
        ></Link>
      </div>

      <div className="pt-6 w-full">
        <Accordion type="single" collapsible className=" list-none">
          {sidebarItems?.map((item, index) => (
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
                        className="flex mb-2 px-2 mx-6 items-center py-2 rounded-xl text-slate-700 hover:bg-[#004B86]/70 hover:text-white transition duration-150 cursor-pointer"
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
      </div>
    </aside>
  );
}

export default Sidebar;
