import { useAuthContext } from "@/context/AuthContext";

export default function AdminMainPage() {
  const { user } = useAuthContext();
  return (
    <div className="flex items-center justify-center pt-48  w-full flex-col gap-4">
      <div className="text-slate-900 text-4xl font-medium text-center">
        Welcome 
      </div>
      {/* <div className="text-slate-900 text-4xl font-medium text-center">{user?.name}</div> */}
    </div>
  );
}

