import { useEffect } from "react";
import useTranslation from "../hooks/useTranslation";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { useCategoryStore } from "../stores/useCategoryStore";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
        const { fetchFeaturedProducts, products, loading: productsLoading } = useProductStore();
        const { categories, fetchCategories, loading: categoriesLoading } = useCategoryStore();
        const { t } = useTranslation();

        useEffect(() => {
                fetchFeaturedProducts();
        }, [fetchFeaturedProducts]);

        useEffect(() => {
                fetchCategories();
        }, [fetchCategories]);

        return (
                <div className='page-content relative min-h-screen overflow-hidden text-payzone-navy'>
                        <div className='absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(122,168,159,0.18),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(200,180,138,0.25),transparent_32%)]' />
                        <div className='relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
                                <div className='mb-8 flex flex-col items-center gap-4 text-center'>
                                        <span className='inline-flex items-center gap-2 rounded-full border border-payzone-indigo/40 bg-payzone-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-payzone-indigo shadow-sm'>
                                                {t("home.titleLine1")}
                                        </span>
                                        <h1 className='text-4xl font-bold leading-tight text-payzone-navy sm:text-6xl'>
                                                <span className='bg-gradient-to-r from-payzone-navy via-payzone-indigo to-payzone-gold bg-clip-text text-transparent'>
                                                        {t("home.titleHighlight")}
                                                </span>
                                        </h1>
                                        <p className='max-w-3xl text-lg text-payzone-navy/70'>{t("home.subtitle")}</p>
                                </div>

                                <div className='rounded-3xl border border-payzone-indigo/20 bg-payzone-white/80 p-4 shadow-lg shadow-payzone-navy/5 backdrop-blur-sm'>
                                        <SearchBar />
                                </div>

                                <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
                                        {categories.length === 0 && !categoriesLoading && (
                                                <div className='col-span-full text-center text-black'>
                                                        {t("categories.manager.list.empty")}
                                                </div>
                                        )}
                                        {categories.map((category) => (
                                                <CategoryItem category={category} key={category._id} />
                                        ))}
                                </div>

                                {!productsLoading && products.length > 0 && (
                                        <FeaturedProducts featuredProducts={products} />
                                )}
                        </div>
                </div>
	);
};
export default HomePage;
