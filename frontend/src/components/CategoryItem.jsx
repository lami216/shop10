import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useTranslation from "../hooks/useTranslation";

const CategoryItem = ({ category }) => {
        const { t } = useTranslation();
        return (
                <div className='group relative h-96 w-full overflow-hidden rounded-2xl border border-payzone-indigo/20 bg-payzone-white/40 shadow-lg shadow-payzone-navy/10 backdrop-blur-sm'>
                        <Link to={`/category/${category.slug}`}>
                                <div className='h-full w-full cursor-pointer'>
                                        <img
                                                src={category.imageUrl}
                                                alt={category.name}
                                                className='h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
                                                loading='lazy'
                                        />
                                        <div className='absolute bottom-0 left-0 right-0 z-20 p-5'>
                                                <h3 className='mb-1 text-2xl font-semibold text-payzone-white'>{category.name}</h3>
                                                <p className='text-sm text-payzone-gold'>
                                                        {t("categories.explore", { category: category.name })}
                                                </p>
                                        </div>
                                </div>
                        </Link>
                </div>
        );
};

export default CategoryItem;

CategoryItem.propTypes = {
        category: PropTypes.shape({
                _id: PropTypes.string,
                slug: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                imageUrl: PropTypes.string,
        }).isRequired,
};
