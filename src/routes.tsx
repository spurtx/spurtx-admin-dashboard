import { createBrowserRouter } from "react-router";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/dashboard";
import Sync from "./pages/sync";
import Login from "./pages/login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            }, 
            {
                path: "/sync",
                element:  <Sync />
            },
            
        ],
        
    },
    {
        path: "/login",
        element:  <Login />
    }
])

export default router;