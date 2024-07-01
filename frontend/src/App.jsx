import React, { useContext, useEffect } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import AdminPage from "./Pages/admin/AdminPage";
import BlockPage from "./components/admin/block/BlockPage";
import GpPage from "./components/admin/gp/GpPage";
import ThemePage from "./components/admin/theme/ThemePage";
import DistrictPage from "./components/admin/district/DistrictPage";
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
import GpWiseKpiApprovalPage from "./components/admin/action/admin/gp-wise-kpi/approve";
import GpWiseKpiApprovalView from "./components/admin/action/admin/gp-wise-kpi/view";
import UpdateGpWiseKpi from "./components/admin/action/young-fellow/gp-wise-kpi/resubmit";
import ThemeDataPage from "./Pages/ThemeDataPage";
import YfGpWiseKpiApprovalList from "./components/admin/action/young-fellow/gp-wise-kpi/list";
import GpWiseKpiApprovalList from "./components/admin/action/admin/gp-wise-kpi/list";
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
import GoodPracticeForm from "./components/admin/good-practices/GoodPracticeForm";
import GoodPracticeApprovalsList from "./components/admin/action/admin/good practice/list";
import GoodPracticeApprovalPage from "./components/admin/action/admin/good practice/approve";
import GoodPracticeApprovalsListYF from "./components/admin/action/young-fellow/good-practice/list";
import GoodPracticeResubmit from "./components/admin/action/young-fellow/good-practice/resubmit";
import GoodPracticeViewDetails from "./components/admin/action/admin/good practice/view";
import LCVAForm from "./components/admin/lcva/LCVAForm";
import LCVAApprovalsList from "./components/admin/action/admin/lcva/list";
import LCVAApprovalPage from "./components/admin/action/admin/lcva/approve";
import LCVAApprovalsListYF from "./components/admin/action/young-fellow/lcva/list";
import LCVAResubmit from "./components/admin/action/young-fellow/lcva/resubmit";
import LCVAViewDetails from "./components/admin/action/admin/lcva/view";
import AdminIndicatorApprovalList from "./components/admin/action/admin/gp-wise-indicator/list";
import IndicatorApprovalAdminForm from "./components/admin/action/admin/gp-wise-indicator/approve";
import YFIndicatorApprovalList from "./components/admin/action/young-fellow/indicator/list";
import IndicatorApprovalResubmit from "./components/admin/action/young-fellow/indicator/resubmit";
import TrainingApprovalsList from "./components/admin/action/admin/training/list";
import TrainingApprovalPage from "./components/admin/action/admin/training/approve";
import TrainingApprovalsListYf from "./components/admin/action/young-fellow/training/list";
import TrainingResubmit from "./components/admin/action/young-fellow/training/resubmit";
import TrainingViewDetails from "./components/admin/action/admin/training/view";
import GpDetailsApprovalsList from "./components/admin/action/admin/gp-details/list";
import GpDetailsApprovalPage from "./components/admin/action/admin/gp-details/approve";
import GpDetailsViewDetials from "./components/admin/action/admin/gp-details/view";
import GpDetailsApprovalsListYf from "./components/admin/action/young-fellow/gp-details/list";
import GpDetailsApprovalResubmit from "./components/admin/action/young-fellow/gp-details/resubmit";
import AchievementChart from "./AchievemetnChart";
import SuperadminApprovalList from "./components/admin/action/superadmin/page";
import IndicatorViewDetials from "./components/admin/action/admin/gp-wise-indicator/view";
import DataTable from "./components/admin/master/Deleted";
import DeletedItems from "./components/admin/master/Deleted";
import Masters from "./components/admin/master/Masters";
import ChangePassword from "./components/admin/change-password/page";

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
          <Route path="test" element={<AchievementChart />} />

          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<AdminMainPage />} />
            <Route path="blocks" element={<BlockPage />} />
            <Route path="gram-panchayats" element={<GpPage />} />
            <Route path="themes" element={<ThemePage />} />
            <Route path="districts" element={<DistrictPage />} />
            <Route path="states" element={<StatePage />} />
            <Route path="users/create" element={<CreateUserForm />} />
            <Route path="young-professionals" element={<YoungFellowForm />} />
            <Route path="gp-wise-kpi" element={<GpWiseKpiList />} />
            <Route path="change-password" element={<ChangePassword />} />

            <Route path="users" element={<UserPage />} />
            <Route path="users/view/:id" element={<UserView />} />
            <Route path="data-point" element={<DataPointPage />} />
            <Route path="data-point/view/:kpiId" element={<KpiViewPage />} />

            <Route path="state/create" element={<StateForm />} />
            <Route path="district/create" element={<DistrictForm />} />
            <Route path="block/create" element={<BlockForm />} />
            <Route path="gram/create" element={<GpForm />} />
            <Route path="theme/create" element={<ThemeForm />} />
            <Route path="data-point/create" element={<DataPointForm />} />

            <Route path="users/update/:id" element={<CreateUserForm update />} />
            <Route path="theme/update/:themeId" element={<ThemeForm type={"update"} />} />
            <Route path="data-point/update/:kpiId" element={<DataPointForm type="update" />} />
            <Route path="state/update/:stateId" element={<StateForm type="update" />} />

            <Route path="user-location/assign/admin/:userId" element={<UserLocation role={2} />} />
            <Route path="user-location/assign/young-fellow/:userId" element={<UserLocation role={3} />} />
            <Route path="user-location/update/admin/:userId" element={<UpdateUserLocation role={2} />} />
            <Route path="user-location/update/young-fellow/:userId" element={<UpdateUserLocation role={3} />} />
            <Route path="user-location/view/admin/:userId" element={<LocationView view role={2} />} />
            <Route path="user-location/view/young-fellow/:userId" element={<LocationView role={3} />} />

            <Route path="users/all/admin" element={<UserList role={2} />} />
            <Route path="users/all/young-fellow" element={<UserList role={3} />} />

            <Route path="attendance/attendance" element={<Attendance />} />
            <Route path="attendance/amu-upload" element={<AmUploadForm />} />
            <Route path="attendance/pmu-upload" element={<PmUploadForm />} />

            <Route path="young-fellow-insight" element={<YoungFellowInsights />} />
            <Route path="young-fellow-insight/edit/:id" element={<YoungFellowInsights update={true} />} />
            <Route path="young-fellow-insight/submissions" element={<FellowInsightPage />} />

            <Route path="add-gp-wise-kpi" element={<AddGpWiseKpi />} />
            <Route path="action/admin/gp-wise-kpi" element={<GpWiseKpiApprovalList />} />
            <Route path="approve/gp-wise-kpi/:id" element={<GpWiseKpiApprovalPage />} />
            <Route path="view/gp-wise-kpi/:id" element={<GpWiseKpiApprovalView />} />
            <Route path="resubmit/gp-wise-kpi/:id" element={<UpdateGpWiseKpi />} />
            <Route path="action/young-fellow/gp-wise-kpi" element={<YfGpWiseKpiApprovalList />} />

            <Route path="kpi-approvals-list" element={<KpiApprovalsList />} />

            <Route path="good-practices" element={<GoodPracticeForm />} />
            <Route path="action/admin/good-practice" element={<GoodPracticeApprovalsList />} />
            <Route path="approve/good-practice/:id" element={<GoodPracticeApprovalPage />} />
            <Route path="view/good-practice/:id" element={<GoodPracticeViewDetails />} />
            <Route path="action/young-fellow/good-practice" element={<GoodPracticeApprovalsListYF />} />
            <Route path="resubmit/good-practice/:id" element={<GoodPracticeResubmit />} />

            <Route path="lcvas" element={<LCVAForm />} />
            <Route path="action/admin/lcva" element={<LCVAApprovalsList />} />
            <Route path="approve/lcva/:id" element={<LCVAApprovalPage />} />
            <Route path="view/lcva/:id" element={<LCVAViewDetails />} />
            <Route path="action/young-fellow/lcva" element={<LCVAApprovalsListYF />} />
            <Route path="resubmit/lcva/:id" element={<LCVAResubmit />} />

            <Route path="gp-details" element={<GpDetailsForm />} />
            <Route path="action/admin/gp-details" element={<GpDetailsApprovalsList />} />
            <Route path="approve/gp-details/:id" element={<GpDetailsApprovalPage />} />
            <Route path="view/gp-details/:id" element={<GpDetailsViewDetials />} />
            <Route path="action/young-fellow/gp-details" element={<GpDetailsApprovalsListYf />} />
            <Route path="resubmit/gp-details/:id" element={<GpDetailsApprovalResubmit />} />

            <Route path="training" element={<TrainingForm />} />
            <Route path="action/admin/training" element={<TrainingApprovalsList />} />
            <Route path="approve/training/:id" element={<TrainingApprovalPage />} />
            <Route path="view/training/:id" element={<TrainingViewDetails />} />
            <Route path="action/young-fellow/training" element={<TrainingApprovalsListYf />} />
            <Route path="resubmit/training/:id" element={<TrainingResubmit />} />

            <Route path="indicator" element={<IndicatorForm />} />
            <Route path="action/admin/indicator" element={<AdminIndicatorApprovalList />} />
            <Route path="action/young-fellow/indicator" element={<YFIndicatorApprovalList />} />
            <Route path="approve/indicator/:id" element={<IndicatorApprovalAdminForm />} />
            <Route path="view/indicator/:id" element={<IndicatorViewDetials />} />
            <Route path="resubmit/indicator/:id" element={<IndicatorApprovalResubmit />} />

            <Route path="action/superadmin" element={<SuperadminApprovalList />} />
            <Route path="deleted-masters" element={<DeletedItems />} />
            <Route path="masters" element={<Masters />} />
          </Route>
        </Route>
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
