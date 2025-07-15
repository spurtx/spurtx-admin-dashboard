
import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/dashboard";
import Sync from "./pages/sync";
import Login from "./pages/login";
import ProtectedRoutes from "./components/protectedRoutes";
import Referrals from "./pages/referrals";
import Projects from "./pages/sync/projects";
import Milestones from "./pages/sync/milestone";
import Proposals from "./pages/sync/proposals";
import Tasks from "./pages/sync/tasks";
import Sparks from "./pages/sparks";
import Subscription from "./pages/subscription";
import Spot from "./pages/spot";
import Spur from "./pages/spur";
import SyncWallet from "./pages/syncWallet";
import Employees from "./pages/employees";
import ProductLists from "./pages/products";
import AccountManagement from "./pages/accountManagement";
import Register from "./pages/register";
import { Navigate } from "react-router-dom";
import Templates from "./pages/templates";
// import JobApplicationsTable from "./components/spot/JobApplicationTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoutes />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "sync", element: <Sync /> },
          { path: "referrals", element: <Referrals /> },
          { path: "sync/projects", element: <Projects /> },
          { path: "sync/milestones", element: <Milestones /> },
          { path: "sync/proposals", element: <Proposals /> },
          { path: "sync/tasks", element: <Tasks /> },
          { path: "sparks", element: <Sparks /> },
          { path: "subscription", element: <Subscription /> },
          { 
            path: "spot", 
            children: [
              { index: true, element: <Spot /> },
              // Add the job applications route with the correct path
              // { path: "job-seekers/:userId/applications", element: <JobApplicationsTable /> }
            ]
          },
          { path: "spur", element: <Spur /> },
          { path: "sync-wallet", element: <SyncWallet /> },
          { path: "employees", element: <Employees /> },
          { path: "product-lists", element: <ProductLists /> },
          { path: "account-management", element: <AccountManagement /> },
          { path: "templates", element: <Templates /> }
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default router;