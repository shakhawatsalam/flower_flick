import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { getFromLocalStorage } from "@/utils/local_sotrage"; // adjust as needed
import Loader from "@/components/Loader";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userSlice);
  const token = getFromLocalStorage("authToken");
  const location = useLocation();

  // Wait for user to load if token exists
  if (token && user === null) {
    return <Loader />;
  }

  // Not authenticated
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // Authenticated but not admin
  if (!user.is_staff) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default AdminRoute;
