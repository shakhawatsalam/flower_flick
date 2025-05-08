import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import AboutPage from "@/pages/AboutPage";
import ActivateAccountPage from "@/pages/ActivateAccountPage";
import BlogPage from "@/pages/BlogPage";
import CartPage from "@/pages/CartPage";
import DashboardCategories from "@/pages/Dashboard/DashboardCategories";
import DashboardFlower from "@/pages/Dashboard/DashboardFlower";
import DashboardHome from "@/pages/Dashboard/DashboardHome";
import DashboardOrders from "@/pages/Dashboard/DashboardOrders";
import EmailCheckPage from "@/pages/EmailCheckPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import OrderPage from "@/pages/OrderPage";
import PaymentSuccess from "@/pages/PaymentSuccess";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import ShopPage from "@/pages/ShopPage";
import SignUpPage from "@/pages/SignUpPage";
import { useFetchUserProfileQuery } from "@/redux/features/auth/authApi";
import { useCreateCartMutation } from "@/redux/features/cart/cartApi";
import { addCart } from "@/redux/features/cart/cartSlice";
import { addUser } from "@/redux/features/user/userSlice";
import { getFromLocalStorage } from "@/utils/local_sotrage";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ProfilePage from "@/pages/ProfilePage";

const AppRoutes = () => {
  const { data: userData } = useFetchUserProfileQuery(undefined, {
    skip: !getFromLocalStorage("authToken"), // Skip query if no token
  });
  const [createCart, { data: cart, isSuccess }] = useCreateCartMutation();
  const dispatch = useDispatch();
  const hasCreatedCart = useRef(false); // Track if cart creation was attempted

  useEffect(() => {
    const token = getFromLocalStorage("authToken");
    if (token && !hasCreatedCart.current) {
      hasCreatedCart.current = true; // Prevent future calls
      createCart();
    }
  }, [createCart]); // Only depend on createCart

  useEffect(() => {
    if (isSuccess && cart) {
      dispatch(addCart(cart)); // Dispatch cart when mutation succeeds
    }
  }, [cart, isSuccess, dispatch]);

  useEffect(() => {
    if (userData) {
      dispatch(addUser(userData)); // Dispatch user data when available
    }
  }, [userData, dispatch]);
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/flower/:id' element={<ProductDetailsPage />} />
      </Route>
      {/* Protected routes with MainLayout inside PrivateRoute */}
      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }>
        <Route path='/cart' element={<CartPage />} />
        <Route path='/orders' element={<OrderPage />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/activate/:uid/:token' element={<ActivateAccountPage />} />
        <Route path='/check-email' element={<EmailCheckPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
      <Route
        element={
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        }>
        <Route path='/dashboard' element={<DashboardHome />} />
        <Route path='/dashboard/flowers' element={<DashboardFlower />} />
        <Route path='/dashboard/categories' element={<DashboardCategories />} />
        <Route path='/dashboard/orders' element={<DashboardOrders />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
