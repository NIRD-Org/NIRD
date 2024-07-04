import React, { useContext, useEffect } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import AdminPage from "./Pages/admin/AdminPage";
import KPIDetails from "./Pages/KPIDetails";
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
import StateForm from "./components/admin/master/forms/StateForm";
import DistrictForm from "./components/admin/master/forms/DistrictForm";
import BlockForm from "./components/admin/master/forms/BlockForm";
import GpForm from "./components/admin/master/forms/GpForm";
import ThemeForm from "./components/admin/master/forms/ThemeForm";
import IndicatorForm from "./components/admin/young-fellow/IndicatorForm";
import AdminMainPage from "./components/admin/redundant/AdminMainPage";
import DataPointForm from "./components/admin/master/forms/KpiForm";
import KpiApprovalsList from "./components/admin/young-fellow/KpiApprovalsList";
import GpWiseKpiApprovalPage from "./components/admin/action/admin/gp-wise-kpi/approve";
import GpWiseKpiApprovalView from "./components/admin/action/admin/gp-wise-kpi/view";
import UpdateGpWiseKpi from "./components/admin/action/young-fellow/gp-wise-kpi/resubmit";
import ThemeDataPage from "./Pages/ThemeDataPage";
import GpWiseKpiApprovalList from "./components/admin/action/admin/gp-wise-kpi/list";
import UserLocation from "./components/admin/user-location/UserLocation";
import GpDetailsForm from "./components/admin/young-fellow/GpDetailsForm";
import UserList from "./components/admin/user-location/UserList";
import PmUploadForm from "./components/admin/attendance/PmuUpload";
import AmUploadForm from "./components/admin/attendance/AmuUpload";
import Attendance from "./components/admin/attendance/Attendance";
import UpdateUserLocation from "./components/admin/user-location/UpdateUserLocation";
import GramPanchayatProfile from "./Pages/GramPanchayatProfile";
import YoungFellowInsights from "./components/admin/young-fellow-insight/YoungFellowInsight";
import FellowInsightPage from "./components/admin/young-fellow-insight/FellowInsightPage";
import YfInsightsPage from "./Pages/YfInsightsPage";
// import KpiViewPage from "./components/admin/kpi/KpiView";
import UserPage from "./components/admin/users/UserPage";
import UserView from "./components/admin/users/UserView";
import GoodPractices from "./Pages/GoodPractices";
import LCVAPage from "./Pages/LCVAPage";
import TrainingPage from "./Pages/TrainingPage";
import TrainingForm from "./components/admin/young-fellow/TrainingForm";
import LocationView from "./components/admin/user-location/LocationView";
import GoodPracticeForm from "./components/admin/young-fellow/GoodPracticeForm";
import GoodPracticeApprovalsList from "./components/admin/action/admin/good practice/list";
import GoodPracticeApprovalPage from "./components/admin/action/admin/good practice/approve";
import GoodPracticeResubmit from "./components/admin/action/young-fellow/good-practice/resubmit";
import GoodPracticeViewDetails from "./components/admin/action/admin/good practice/view";
import LCVAForm from "./components/admin/young-fellow/LCVAForm";
import LCVAApprovalsList from "./components/admin/action/admin/lcva/list";
import LCVAApprovalPage from "./components/admin/action/admin/lcva/approve";
import LCVAResubmit from "./components/admin/action/young-fellow/lcva/resubmit";
import LCVAViewDetails from "./components/admin/action/admin/lcva/view";
import AdminIndicatorApprovalList from "./components/admin/action/admin/gp-wise-indicator/list";
import IndicatorApprovalAdminForm from "./components/admin/action/admin/gp-wise-indicator/approve";
import IndicatorApprovalResubmit from "./components/admin/action/young-fellow/indicator/resubmit";
import TrainingApprovalsList from "./components/admin/action/admin/training/list";
import TrainingApprovalPage from "./components/admin/action/admin/training/approve";
import TrainingResubmit from "./components/admin/resubmit";
import TrainingViewDetails from "./components/admin/action/admin/training/view";
import GpDetailsApprovalsList from "./components/admin/action/admin/gp-details/list";
import GpDetailsApprovalPage from "./components/admin/action/admin/gp-details/approve";
import GpDetailsViewDetials from "./components/admin/action/admin/gp-details/view";
import GpDetailsApprovalResubmit from "./components/admin/action/young-fellow/gp-details/resubmit";
import AchievementChart from "./AchievemetnChart";
import SuperadminApprovalList from "./components/admin/action/superadmin/page";
import IndicatorViewDetials from "./components/admin/action/admin/gp-wise-indicator/view";
import DeletedItems from "./components/admin/master/Deleted";
import Masters from "./components/admin/master/Masters";
import ChangePassword from "./components/admin/change-password/page";
import AmUploadView from "./components/admin/attendance/AmuView";
import AmUploadList from "./components/admin/attendance/AmuList";
import PmUploadList from "./components/admin/attendance/PmuList";
import PmUploadView from "./components/admin/attendance/PmuView";

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

            <Route path="young-professionals" element={<YoungFellowForm />} />
            <Route path="gp-wise-kpi" element={<GpWiseKpiList />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="users" element={<UserPage />} />
            <Route path="users/view/:id" element={<UserView />} />
            {/* <Route path="data-point/view/:kpiId" element={<KpiViewPage />} /> */}
            <Route path="kpi-approvals-list" element={<KpiApprovalsList />} />
            <Route path="action/superadmin" element={<SuperadminApprovalList />} />

            <Route path="master-states" element={<Masters item="state" />} />
            <Route path="master-districts" element={<Masters item="district" />} />
            <Route path="master-blocks" element={<Masters item="block" />} />
            <Route path="master-gps" element={<Masters item="gp" />} />
            <Route path="master-themes" element={<Masters item="theme" />} />
            <Route path="master-kpis" element={<Masters item="kpi" />} />
            <Route path="master-deleted" element={<DeletedItems />} />

            <Route path="state/create" element={<StateForm />} />
            <Route path="district/create" element={<DistrictForm />} />
            <Route path="block/create" element={<BlockForm />} />
            <Route path="gp/create" element={<GpForm />} />
            <Route path="theme/create" element={<ThemeForm />} />
            <Route path="kpi/create" element={<DataPointForm />} />
            <Route path="users/create" element={<CreateUserForm />} />
            
            <Route path="state/update/:id" element={<StateForm type="update" />} />
            <Route path="district/update/:id" element={<DistrictForm type="update"/>} />
            <Route path="block/update/:id" element={<BlockForm type="update"/>} />
            <Route path="gp/update/:id" element={<GpForm type="update"/>} />
            <Route path="theme/update/:themeId" element={<ThemeForm type={"update"} />} />
            <Route path="kpi/update/:kpiId" element={<DataPointForm type="update" />} />
            <Route path="users/update/:id" element={<CreateUserForm update />} />
           
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
            <Route path="attendance/amu-upload/list" element={<AmUploadList />} />
            <Route path="attendance/pmu-upload/list" element={<PmUploadList />} />
            <Route path="view/amu-upload/:id" element={<AmUploadView />} />
            <Route path="view/pmu-upload/:id" element={<PmUploadView />} />

            <Route path="young-fellow-insight" element={<YoungFellowInsights />} />
            <Route path="young-fellow-insight/edit/:id" element={<YoungFellowInsights update={true} />} />
            <Route path="young-fellow-insight/submissions" element={<FellowInsightPage />} />

            <Route path="add-gp-wise-kpi" element={<AddGpWiseKpi />} />
            <Route path="action/admin/gp-wise-kpi" element={<GpWiseKpiApprovalList />} />
            <Route path="approve/gp-wise-kpi/:id" element={<GpWiseKpiApprovalPage />} />
            <Route path="view/gp-wise-kpi/:id" element={<GpWiseKpiApprovalView />} />
            <Route path="resubmit/gp-wise-kpi/:id" element={<UpdateGpWiseKpi />} />
            <Route path="edit/gp-wise-kpi/:id" element={<UpdateGpWiseKpi edit/>} />


            <Route path="good-practices" element={<GoodPracticeForm />} />
            <Route path="action/admin/good-practice" element={<GoodPracticeApprovalsList />} />
            <Route path="approve/good-practice/:id" element={<GoodPracticeApprovalPage />} />
            <Route path="view/good-practice/:id" element={<GoodPracticeViewDetails />} />
            <Route path="resubmit/good-practice/:id" element={<GoodPracticeResubmit />} />

            <Route path="lcvas" element={<LCVAForm />} />
            <Route path="action/admin/lcva" element={<LCVAApprovalsList />} />
            <Route path="approve/lcva/:id" element={<LCVAApprovalPage />} />
            <Route path="view/lcva/:id" element={<LCVAViewDetails />} />
            <Route path="resubmit/lcva/:id" element={<LCVAResubmit />} />

            <Route path="gp-details" element={<GpDetailsForm />} />
            <Route path="action/admin/gp-details" element={<GpDetailsApprovalsList />} />
            <Route path="approve/gp-details/:id" element={<GpDetailsApprovalPage />} />
            <Route path="view/gp-details/:id" element={<GpDetailsViewDetials />} />
            <Route path="resubmit/gp-details/:id" element={<GpDetailsApprovalResubmit />} />

            <Route path="training" element={<TrainingForm />} />
            <Route path="action/admin/training" element={<TrainingApprovalsList />} />
            <Route path="approve/training/:id" element={<TrainingApprovalPage />} />
            <Route path="view/training/:id" element={<TrainingViewDetails />} />
            <Route path="resubmit/training/:id" element={<TrainingResubmit />} />

            <Route path="indicator" element={<IndicatorForm />} />
            <Route path="action/admin/indicator" element={<AdminIndicatorApprovalList />} />
            <Route path="approve/indicator/:id" element={<IndicatorApprovalAdminForm />} />
            <Route path="view/indicator/:id" element={<IndicatorViewDetials />} />
            <Route path="resubmit/indicator/:id" element={<IndicatorApprovalResubmit />} />
            <Route path="edit/indicator/:id" element={<IndicatorApprovalResubmit edit/>} />


           
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
