import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { NirdHamIcon } from "./Icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
function Navbar() {
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <header className="z-[3] w-full gap-4 h-16 rounded-md shadow-md bg-white flex items-center px-6 justify-between">
        <div></div>
        <div className="flex items-center gap-3">
          <div >
            <h2>{user?.role == 1 ? 'Superadmin' : user?.role == 2 ? 'Admin' : user?.role == 3 ? 'Young Fellow' : ''}</h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <NirdHamIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-primary text-slate-100 rounded-none mt-2 w-60">
              <DropdownMenuItem>Change Password</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Change Mobile Number</DropdownMenuItem>
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
