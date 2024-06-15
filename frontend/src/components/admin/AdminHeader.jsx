import React from "react";

function AdminHeader({ children }) {
  return <h2 className="text-xl font-semibold mb-10 text-center bg-slate-200 py-3">{children}</h2>;
}

export default AdminHeader;
