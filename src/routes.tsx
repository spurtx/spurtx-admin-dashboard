
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />, // Protect all child routes
    children: [
      {
        path: "/",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "/sync", element: <Sync /> },
          { path: "/referrals", element: <Referrals /> },
          {path: "/sync/projects", element: <Projects />},
          {path: "/sync/milestones", element: <Milestones />},
          {path: "/sync/proposals", element: <Proposals />},
          {path: "/sync/tasks", element: <Tasks />},
          {path: "/sparks", element: <Sparks />},
          {path: "/subscription", element: <Subscription />},
          {path: "/spot", element: <Spot />},
          {path: "Spur", element: <Spur />}
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
