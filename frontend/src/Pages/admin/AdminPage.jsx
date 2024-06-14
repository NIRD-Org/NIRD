import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import { useAuthContext } from "@/context/AuthContext";
import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminPage({ children }) {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <div className="text-slate-900 text-3xl w-full flex items-center justify-center min-h-screen">Unauthorized</div>;
  }

  return (
    <div className="text-slate-900 ">
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
