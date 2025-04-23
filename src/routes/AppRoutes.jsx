import MainLayout from "@/layouts/MainLayout";
import AboutPage from "@/pages/AboutPage";
import BlogPage from "@/pages/BlogPage";
import CartPage from "@/pages/CartPage";
import EmailCheckPage from "@/pages/EmailCheckPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import ShopPage from "@/pages/ShopPage";
import SignUpPage from "@/pages/SignUpPage";
import { useFetchUserProfileQuery } from "@/redux/features/auth/authApi";
import { addUser } from "@/redux/features/user/userSlice";
import { getFromLocalStorage } from "@/utils/local_sotrage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";

const AppRoutes = () => {
  const { data } = useFetchUserProfileQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getFromLocalStorage("authToken");
    if (token) {
      dispatch(addUser(data));
    }
  }, [data, dispatch]);
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/check-email' element={<EmailCheckPage />} />
        <Route path='/flower/:id' element={<ProductDetailsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
