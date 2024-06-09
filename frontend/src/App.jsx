import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/admin/AdminPage";
import TalukPage from "./components/admin/TalukPage";
import GpPage from "./components/admin/GpPage";
import KpiPage from "./components/admin/KpiPage";
import ThemePage from "./components/admin/ThemePage";
import GpWiseKpiPage from "./components/admin/GpWiseKpiPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
        </Route>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<TalukPage />} />
          <Route path="taluks" element={<TalukPage />} />
          <Route path="gram-panchayats" element={<GpPage />} />
          <Route path="kpi" element={<KpiPage />} />
          <Route path="themes" element={<ThemePage />} />
          <Route path="gp-wise-kpi" element={<GpWiseKpiPage />} />
        </Route>
      </Route>
    )
  );

  return (
    <main className="dark:bg-dark">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
