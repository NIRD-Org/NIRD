import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <header className="z-[3] w-full gap-4 h-16 rounded-md shadow-md bg-white flex items-center px-6 justify-between">
        <Button onClick={handleLogout} className="ml-auto">
          Logout
        </Button>
      </header>
    </>
  );
}

export default Navbar;
