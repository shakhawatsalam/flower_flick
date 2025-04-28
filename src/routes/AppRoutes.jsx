import MainLayout from "@/layouts/MainLayout";
import AboutPage from "@/pages/AboutPage";
import ActivateAccountPage from "@/pages/ActivateAccountPage";
import BlogPage from "@/pages/BlogPage";
import CartPage from "@/pages/CartPage";
import EmailCheckPage from "@/pages/EmailCheckPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import ShopPage from "@/pages/ShopPage";
import SignUpPage from "@/pages/SignUpPage";
import { useFetchUserProfileQuery } from "@/redux/features/auth/authApi";
import {
  useCreateCartMutation,

} from "@/redux/features/cart/cartApi";
import { addCart } from "@/redux/features/cart/cartSlice";
import { addUser } from "@/redux/features/user/userSlice";
import { getFromLocalStorage } from "@/utils/local_sotrage";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";

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
      console.log("cart from app route :", cart)
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
        <Route path='/cart' element={<CartPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/activate/:uid/:token' element={<ActivateAccountPage />} />
        <Route path='/check-email' element={<EmailCheckPage />} />
        <Route path='/flower/:id' element={<ProductDetailsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
