// src/router/AdminPublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthUser";
import AdminLogin from "../pages/admin/loginAdmin";
import Loading from "../components/loading";

const AdminPublicRoute = () => {
  const { isAdmin,loading } = useAuth();

  if (isAdmin) {
    // Redirect to admin layout if already logged in
    return <Navigate to="/adminLayout" />;
  }
  if(loading){
    return <div className="flex justify-center items-center h-screen"><Loading/></div>
  }

  return <AdminLogin/>;
};

export default AdminPublicRoute;
