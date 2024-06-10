import React, { useContext, useEffect } from "react";
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
import TalukPage from "./components/admin/taluka/TalukPage";
import GpPage from "./components/admin/gp/GpPage";
import KpiPage from "./components/admin/kpi/KpiPage";
import ThemePage from "./components/admin/theme/ThemePage";
import GpWiseKpiPage from "./components/admin/gp-wise-kpi/GpWiseKpiPage";
import DistrictPage from "./components/admin/district/DistrictPage";
import KPIApprovalPage from "./components/admin/kpi-approval/KPIApprovalPage";
import KPIDetails from "./Pages/KPIDetails";
import StatePage from "./components/admin/state/StatePage";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./Pages/RegisterPage";
import KPIQuestionPage from "./components/admin/kpi-question/KPIQuestionPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/gp-profile/:id" element={<KPIDetails />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<TalukPage />} />
          <Route path="taluks" element={<TalukPage />} />
          <Route path="gram-panchayats" element={<GpPage />} />
          <Route path="kpi" element={<KpiPage />} />
          <Route path="themes" element={<ThemePage />} />
          <Route path="gp-wise-kpi" element={<GpWiseKpiPage />} />
          <Route path="districts" element={<DistrictPage />} />
          <Route path="kpi-approvals" element={<KPIApprovalPage />} />
          <Route path="kpi-questions" element={<KPIQuestionPage />} />
          <Route path="states" element={<StatePage />} />
        </Route>
        <Route path="/"></Route>
      </Route>
    )
  );

  return (
    <main className="dark:bg-dark">
      <RouterProvider router={router} />
      <Toaster position="bottom-center" />
    </main>
  );
}

export default App;
