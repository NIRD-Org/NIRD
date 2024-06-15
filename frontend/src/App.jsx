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
import KpiPage from "./components/admin/kpi/KpiPage";
import ThemePage from "./components/admin/theme/ThemePage";
import GpWiseKpiPage from "./components/admin/gp-wise-kpi/GpWiseKpiPage";
import DistrictPage from "./components/admin/district/DistrictPage";
import KPIApprovalPage from "./components/admin/kpi-approval/KPIApprovalPage";
import KPIDetails from "./Pages/KPIDetails";
import KPIQuestionPage from "./components/admin/kpi-question/KPIQuestionPage";
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
import GpWiseKpiList from "./components/admin/young-fellow/YoungFellow.jsx/GpWiseKpiList";
import AddGpWiseKpi from "./components/admin/young-fellow/YoungFellow.jsx/AddGpWiseKpi";
import StateForm from "./components/admin/state/StateForm";
import DistrictForm from "./components/admin/district/DistrictForm";
import BlockForm from "./components/admin/block/BlockForm";
import GpForm from "./components/admin/gp/GpForm";
import ThemeForm from "./components/admin/theme/ThemeForm";
import KpiForm from "./components/admin/kpi/KpiForm";
import KpiQuestionForm from "./components/admin/kpi-question/KpiQuestionForm";

function App() {

  const {login } = useAuthContext();

  useEffect(()=>{
    login();
  },[])

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
        </Route>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<BlockPage />} />
          <Route path="blocks" element={<BlockPage />} />
          <Route path="gram-panchayats" element={<GpPage />} />
          <Route path="kpi" element={<KpiPage />} />
          <Route path="themes" element={<ThemePage />} />
          {/* <Route path="gp-wise-kpi" element={<GpWiseKpiPage />} /> */}
          <Route path="districts" element={<DistrictPage />} />
          <Route path="kpi-approvals" element={<KPIApprovalPage />} />
          <Route path="kpi-questions" element={<KPIQuestionPage />} />
          <Route path="states" element={<StatePage />} />
          <Route path="users/create" element={<CreateUserForm />} />
          <Route path="young-professionals" element={<YoungFellowForm />} />
          <Route path="gp-wise-kpi" element={<GpWiseKpiList />} />
          <Route path="add-gp-wise-kpi" element={<AddGpWiseKpi />} />
          <Route path="state/create" element={<StateForm />} />
          <Route path="district/create" element={<DistrictForm />} />
          <Route path="block/create" element={<BlockForm />} />
          <Route path="gram/create" element={<GpForm />} />
          <Route path="theme/create" element={<ThemeForm />} />
          <Route path="kpi/create" element={<KpiForm />} />
          <Route path="kpi-question/create" element={<KpiQuestionForm />} />
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
