import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
        const { user, logout } = useUserStore();
        const isAdmin = user?.role === "admin";
        const { cart } = useCartStore();
        const cartItemCount = cart.reduce((total, item) => total + (item.quantity ?? 0), 0);
        const { t } = useTranslation();

        const cartLink = (
                <Link
                        to={'/cart'}
                        className='relative group flex items-center gap-2 rounded-full border border-payzone-gold/40 bg-white/70 px-4 py-2 text-sm font-semibold text-payzone-navy shadow-sm transition duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg'
                >
                        <ShoppingCart size={18} />
                        <span className='hidden sm:inline'>{t("nav.cart")}</span>
                        {cartItemCount > 0 && (
                                <span className='absolute -top-2 -right-2 rounded-full bg-payzone-gold px-2 py-0.5 text-xs font-semibold text-payzone-navy shadow-sm transition duration-300 ease-in-out group-hover:bg-payzone-gold/80'>
                                        {cartItemCount}
                                </span>
                        )}
                </Link>
        );

        return (
                <header className='fixed top-0 right-0 z-40 w-full border-b border-payzone-gold/30 bg-white/75 backdrop-blur-2xl shadow-lg transition-all duration-300'>
                        <div className='container mx-auto px-4 py-3'>
                                <div className='flex flex-wrap items-center justify-between gap-4'>
                                        <Link to='/' className='flex items-center gap-3 text-payzone-navy'>
                                                <img
                                                        src='/logo.svg'
                                                        alt='شعار زهراء'
                                                        className='h-12 w-12 rounded-2xl border border-payzone-gold/30 bg-payzone-white shadow-lg shadow-payzone-gold/30'
                                                />
                                                <div className='flex flex-col leading-tight'>
                                                        <span className='text-xs uppercase tracking-[0.2em] text-payzone-indigo'>Nature Care</span>
                                                        <span className='text-2xl font-semibold'>{t("common.appName")}</span>
                                                </div>
                                        </Link>

                                        <div className='flex flex-wrap items-center gap-4 text-sm font-medium'>
                                                <nav className='flex items-center gap-4'>
                                                        <Link
                                                                to={'/'}
                                                                className='text-payzone-navy/80 transition duration-300 ease-in-out hover:text-payzone-indigo'
                                                        >
                                                                {t("nav.home")}
                                                        </Link>
                                                        {isAdmin && (
                                                                <Link
                                                                        className='flex items-center gap-2 rounded-full border border-payzone-indigo/50 bg-payzone-indigo/15 px-3 py-1 text-payzone-navy transition duration-300 ease-in-out hover:bg-payzone-indigo/25'
                                                                        to={'/secret-dashboard'}
                                                                >
                                                                        <Lock className='inline-block' size={18} />
                                                                        <span className='hidden sm:inline'>{t("nav.dashboard")}</span>
                                                                </Link>
                                                        )}
                                                </nav>

                                                <div className='flex items-center gap-3'>
                                                        {cartLink}
                                                        {user ? (
                                                                <button
                                                                        className='flex items-center gap-2 rounded-full border border-payzone-navy/10 bg-payzone-white px-4 py-2 text-payzone-navy transition duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg'
                                                                        onClick={logout}
                                                                >
                                                                        <LogOut size={18} />
                                                                        <span className='hidden sm:inline'>{t("nav.logout")}</span>
                                                                </button>
                                                        ) : (
                                                                <>
                                                                        <Link
                                                                                to={'/signup'}
                                                                                className='flex items-center gap-2 rounded-full border border-payzone-gold/40 bg-payzone-gold px-4 py-2 font-semibold text-payzone-navy shadow-sm transition duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg'
                                                                        >
                                                                                <UserPlus size={18} />
                                                                                {t("nav.signup")}
                                                                        </Link>
                                                                        <Link
                                                                                to={'/login'}
                                                                                className='flex items-center gap-2 rounded-full border border-payzone-indigo/50 bg-payzone-indigo/20 px-4 py-2 text-payzone-navy transition duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg'
                                                                        >
                                                                                <LogIn size={18} />
                                                                                {t("nav.login")}
                                                                        </Link>
                                                                </>
                                                        )}
                                                </div>
                                        </div>
                                </div>
                        </div>
                </header>
        );
};
export default Navbar;
