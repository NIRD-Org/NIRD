import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import { Outlet } from "react-router-dom";
export default function HomeLayout({ children }) {
  return (
    <div className="text-slate-900">
      <div className="relative flex min-h-screen ">
        <Sidebar className="sticky top-0 left-0 bottom-0  max-lg:hidden " />
        <div className="w-full md:ml-2 mt-1 relative">
          <Navbar />
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
