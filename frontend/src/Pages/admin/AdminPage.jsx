import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { Link, Outlet } from "react-router-dom";

export default function AdminPage({ children }) {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black  w-full flex-col gap-4">
        <div className="text-slate-100  text-4xl font-medium  ">Unauthorized</div>
        <p className="text-slate-100">Please login to access admin dashboard</p>
        <Link to={"/login"}>
          <Button className="bg-primary">Login</Button>
        </Link>
      </div>
    );
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
