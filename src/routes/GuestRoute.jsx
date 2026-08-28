import Loader from "@/components/Loader";
import { getFromLocalStorage } from "@/utils/local_sotrage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const GuestRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userSlice);
  const token = getFromLocalStorage("authToken");

  if (token && user === null) {
    return <Loader />;
  }

  return user ? <Navigate to='/' replace /> : children;
};

export default GuestRoute;
