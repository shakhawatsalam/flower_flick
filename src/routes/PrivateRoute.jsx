import Loader from "@/components/Loader";
import { getFromLocalStorage } from "@/utils/local_sotrage";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

/**
 * Protects routes that require user authentication.
 * If not authenticated, redirects to login and preserves intended path.
 */
const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userSlice);
  const token = getFromLocalStorage("authToken");
  const location = useLocation();

  // Show loading if token exists but user hasn't been set yet
  if (token && user === null) {
    return <Loader />;
  }

  return user ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default PrivateRoute;
