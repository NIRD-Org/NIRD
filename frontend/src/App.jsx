import React, { useContext, useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import AdminPage from "./Pages/admin/AdminPage";
import BlockPage from "./components/admin/block/BlockPage";
import GpPage from "./components/admin/gp/GpPage";
import ThemePage from "./components/admin/theme/ThemePage";
import DistrictPage from "./components/admin/district/DistrictPage";
import KPIApprovalPage from "./components/admin/kpi-approval/KPIApprovalPage";
import KPIDetails from "./Pages/KPIDetails";
import StatePage from "./components/admin/state/StatePage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProjectPage from "./Pages/ProjectPage";
import Home from "./Pages/Home";
import KPIPage from "./Pages/KPIPage";
import CreateUserForm from "./components/admin/create-user/CreateUserForm";
import YoungFellowForm from "./components/admin/young-fellow/YoungFellowForm";
import { useAuthContext } from "./context/AuthContext";
import GpWiseKpiList from "./components/admin/young-fellow/GpWiseKpiList";
import AddGpWiseKpi from "./components/admin/young-fellow/AddGpWiseKpi";
import StateForm from "./components/admin/state/StateForm";
import DistrictForm from "./components/admin/district/DistrictForm";
import BlockForm from "./components/admin/block/BlockForm";
import GpForm from "./components/admin/gp/GpForm";
import ThemeForm from "./components/admin/theme/ThemeForm";
import IndicatorForm from "./components/admin/young-fellow/IndicatorForm";
import AdminMainPage from "./components/admin/AdminMainPage";
import DataPointForm from "./components/admin/kpi/DataPointForm";
import DataPointPage from "./components/admin/kpi/DataPointPage";
import KpiApprovalsList from "./components/admin/young-fellow/KpiApprovalsList";
import KpiApprovalSubmit from "./components/admin/young-fellow/KpiApprovalSubmit";
import KpiApprovalView from "./components/admin/young-fellow/KpiApprovalView";
import UpdateGpWiseKpi from "./components/admin/young-fellow/UpdateGpWiseKpi";
import ThemeDataPage from "./Pages/ThemeDataPage";
import Attendance from "./components/admin/attendance/Attendance";
import ActionForm from "./components/admin/young-fellow/YfActionForm";
import AdminActionForm from "./components/admin/young-fellow/AdminActionForm";
import UserLocation from "./components/admin/user-location/UserLocation";

function App() {
  const { login } = useAuthContext();

  useEffect(() => {
    login();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/kpi" element={<KPIPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/gp-profile" element={<KPIDetails />} />
          <Route path="project" element={<ProjectPage />} />
          <Route path="/gp-wise-data/theme/:id" element={<ThemeDataPage />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<AdminMainPage />} />
            <Route path="blocks" element={<BlockPage />} />
            <Route path="gram-panchayats" element={<GpPage />} />
            <Route path="themes" element={<ThemePage />} />
            <Route path="districts" element={<DistrictPage />} />
            <Route path="kpi-approvals" element={<KPIApprovalPage />} />
            <Route path="states" element={<StatePage />} />
            <Route path="users/create" element={<CreateUserForm />} />
            <Route path="young-professionals" element={<YoungFellowForm />} />
            <Route path="gp-wise-kpi" element={<GpWiseKpiList />} />
            <Route path="add-gp-wise-kpi" element={<AddGpWiseKpi />} />
            <Route path="update-gp-wise-kpi" element={<UpdateGpWiseKpi />} />
            <Route path="state/create" element={<StateForm />} />
            <Route path="district/create" element={<DistrictForm />} />
            <Route path="block/create" element={<BlockForm />} />
            <Route path="gram/create" element={<GpForm />} />
            <Route path="theme/create" element={<ThemeForm />} />
            <Route path="indicator/create" element={<IndicatorForm />} />
            <Route path="data-point/create" element={<DataPointForm />} />
            <Route path="data-point" element={<DataPointPage />} />
            <Route path="kpi-approvals-list" element={<KpiApprovalsList />} />
            <Route path="submit-kpi-approval" element={<KpiApprovalSubmit />} />
            <Route path="view-kpi-approval" element={<KpiApprovalView />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="action-form" element={<ActionForm />} />
            <Route path="admin-action-form" element={<AdminActionForm />} />
            <Route path="admin/user-location" element={<UserLocation />} />
          </Route>
        </Route>

        <Route path="/"></Route>
      </Route>
    )
  );

  return (
    <main className="dark:bg-dark bg-gray-100">
      <RouterProvider router={router} />
      <Toaster position="bottom-center" />
    </main>
  );
}

export default App;
