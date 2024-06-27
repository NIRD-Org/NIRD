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
import DataPointForm from "./components/admin/kpi/KpiForm";
import DataPointPage from "./components/admin/kpi/KpiPage";
import KpiApprovalsList from "./components/admin/young-fellow/KpiApprovalsList";
import KpiApprovalSubmit from "./components/admin/young-fellow/KpiApprovalSubmit";
import KpiApprovalView from "./components/admin/young-fellow/KpiApprovalView";
import UpdateGpWiseKpi from "./components/admin/young-fellow/UpdateGpWiseKpi";
import ThemeDataPage from "./Pages/ThemeDataPage";
import ActionForm from "./components/admin/young-fellow/YfActionForm";
import AdminActionForm from "./components/admin/young-fellow/AdminActionForm";
import UserLocation from "./components/admin/user-location/UserLocation";
import GpDetailsForm from "./components/admin/Gpdetails/GpDetailsForm";
import UserList from "./components/admin/user-location/UserList";
import PmUploadForm from "./components/admin/attendance/PmuUpload";
// import AttendanceLayout from "./components/admin/attendance/AttendanceLayout";
import AmUploadForm from "./components/admin/attendance/AmuUpload";
import Attendance from "./components/admin/attendance/Attendance";
import UpdateUserLocation from "./components/admin/user-location/UpdateUserLocation";
import GramPanchayatProfile from "./Pages/GramPanchayatProfile";
import YoungFellowInsights from "./components/admin/young-fellow-insight/YoungFellowInsight";
import FellowInsightPage from "./components/admin/young-fellow-insight/FellowInsightPage";
import YfInsightsPage from "./Pages/YfInsightsPage";
import KpiViewPage from "./components/admin/kpi/KpiView";
import UserPage from "./components/admin/users/UserPage";
import UserView from "./components/admin/users/UserView";
import GoodPractices from "./Pages/GoodPractices";
import LCVAPage from "./Pages/LCVAPage";
import TrainingPage from "./Pages/TrainingPage";
import TrainingForm from "./components/admin/training-form/TrainingForm";
import LocationView from "./components/admin/user-location/LocationView";

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
          <Route path="gp-profile/details" element={<GramPanchayatProfile />} />
          <Route path="/yf-insights" element={<YfInsightsPage />} />
          <Route path="good-practices" element={<GoodPractices />} />
          <Route path="low-cost-voluntary-activities" element={<LCVAPage />} />
          <Route path="training" element={<TrainingPage />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<AdminMainPage />} />
            <Route path="gp-details-form" element={<GpDetailsForm />} />
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
            <Route path="users" element={<UserPage />} />
            <Route path="users/view/:id" element={<UserView />} />
            <Route
              path="users/update/:id"
              element={<CreateUserForm update />}
            />

            <Route path="state/create" element={<StateForm />} />
            <Route
              path="state/update/:stateId"
              element={<StateForm type="update" />}
            />
            <Route path="district/create" element={<DistrictForm />} />
            <Route path="block/create" element={<BlockForm />} />
            <Route path="gram/create" element={<GpForm />} />
            <Route path="theme/create" element={<ThemeForm />} />
            <Route
              path="theme/update/:themeId"
              element={<ThemeForm type={"update"} />}
            />
            <Route path="indicator/create" element={<IndicatorForm />} />
            <Route path="data-point/create" element={<DataPointForm />} />
            <Route
              path="data-point/update/:kpiId"
              element={<DataPointForm type="update" />}
            />
            <Route
              path="data-point/update/:kpiId"
              element={<DataPointForm type="update" />}
            />
            <Route path="data-point" element={<DataPointPage />} />
            <Route path="data-point/view/:kpiId" element={<KpiViewPage />} />
            <Route path="kpi-approvals-list" element={<KpiApprovalsList />} />
            <Route path="submit-kpi-approval" element={<KpiApprovalSubmit />} />
            <Route path="view-kpi-approval" element={<KpiApprovalView />} />
            {/* <Route path="attendance" element={<AttendanceLayout />} /> */}
            <Route path="action-form" element={<ActionForm />} />
            <Route path="admin-action-form" element={<AdminActionForm />} />
            <Route
              path="user-location/assign/admin/:userId"
              element={<UserLocation role={2} />}
            />
            <Route
              path="user-location/assign/young-fellow/:userId"
              element={<UserLocation role={3} />}
            />
            <Route path="users/all/admin" element={<UserList role={2} />} />
            <Route
              path="users/all/young-fellow"
              element={<UserList role={3} />}
            />
            <Route path="attendance/attendance" element={<Attendance />} />
            <Route path="attendance/amu-upload" element={<AmUploadForm />} />
            <Route path="attendance/pmu-upload" element={<PmUploadForm />} />
            <Route
              path="user-location/update/admin/:userId"
              element={<UpdateUserLocation role={2} />}
            />
            <Route
              path="user-location/update/young-fellow/:userId"
              element={<UpdateUserLocation role={3} />}
            />
            <Route
              path="user-location/view/admin/:userId"
              element={<LocationView view role={2} />}
            />
            <Route
              path="user-location/view/young-fellow/:userId"
              element={<LocationView role={3}/>}
            />
            <Route
              path="young-fellow-insight"
              element={<YoungFellowInsights />}
            />
            <Route
              path="young-fellow-insight/edit/:id"
              element={<YoungFellowInsights update={true} />}
            />
            <Route
              path="young-fellow-insight/submissions"
              element={<FellowInsightPage />}
            />
            <Route path="training" element={<TrainingForm />} />
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
