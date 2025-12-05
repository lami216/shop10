import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SearchPage from "./pages/SearchPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
        const user = useUserStore((state) => state.user);
        const checkAuth = useUserStore((state) => state.checkAuth);
        const checkingAuth = useUserStore((state) => state.checkingAuth);
        const initializeCart = useCartStore((state) => state.initializeCart);
        const getCartItems = useCartStore((state) => state.getCartItems);

        useEffect(() => {
                checkAuth();
        }, [checkAuth]);

        useEffect(() => {
                initializeCart();
        }, [initializeCart]);

        useEffect(() => {
                if (user) {
                        getCartItems();
                }
        }, [getCartItems, user]);

        if (checkingAuth) {
                return <LoadingSpinner />;
        }

        return (
                <div className='relative min-h-screen bg-gradient-to-b from-[#f6f3ec] via-[#eef6f0] to-[#e3efe6] text-payzone-navy'>
                        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(122,168,159,0.14),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(200,180,138,0.18),transparent_30%),radial-gradient(circle_at_50%_75%,rgba(15,36,29,0.12),transparent_35%)]' />
                        <div className='relative z-50 pt-20'>
                                <Navbar />
                                <Routes>
                                        <Route path='/' element={<HomePage />} />
                                        <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
                                        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
                                        <Route
                                                path='/secret-dashboard'
                                                element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
                                        />
                                        <Route path='/category/:category' element={<CategoryPage />} />
                                        <Route path='/products/:id' element={<ProductDetailPage />} />
                                        <Route path='/search' element={<SearchPage />} />
                                        <Route path='/cart' element={<CartPage />} />
                                        <Route path='/checkout' element={<CheckoutPage />} />
                                        <Route path='/purchase-success' element={<PurchaseSuccessPage />} />
                                        <Route path='/purchase-cancel' element={<PurchaseCancelPage />} />
                                </Routes>
                        </div>
                        <Toaster />
                        <Footer />
                </div>
        );
}

export default App;
