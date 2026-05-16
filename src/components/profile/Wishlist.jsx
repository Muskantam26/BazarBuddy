import { FaTrash, FaCartPlus, FaChevronLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { incrementCount, addItemOptimistically } from '../../redux/slices/cartSlice';
import Button1 from '../ui/Button1';
import paths from '../../path/path';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const navigate = useNavigate();
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromWishlist(id));
        toast.success("Removed from wishlist");
    };

    const handleAddToCart = (product) => {
        toast.success(`${product.name} added to cart! (Mock)`);
        dispatch(addItemOptimistically(product._id || product.id));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    return (
        <div className="bg-[var(--white)] rounded-2xl border border-[var(--border-color)] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[var(--primary-color)] text-white">
                            <th className="px-6 py-4 font-bold text-sm">Product</th>
                            <th className="px-6 py-4 font-bold text-sm">Price</th>
                            <th className="px-6 py-4 font-bold text-sm text-center">Stock Status</th>
                            <th className="px-6 py-4 font-bold text-sm text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                        {wishlistItems.length > 0 ? (
                            wishlistItems.map((item, index) => (
                                <tr key={item._id || item.id || `wishlist-${index}`} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate(`/product/${item._id || item.id}`)}>
                                            <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-[var(--border-color)]">
                                                <img 
                                                    src={Array.isArray(item.images) ? item.images[0] : (item.images || item.image)} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover" 
                                                />
                                            </div>
                                            <span className="font-bold text-[var(--text-main)] text-sm line-clamp-2 max-w-[300px]">
                                                {item.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-black text-[var(--text-main)]">
                                        ₹{item.sellingPrice || item.price}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-3 py-1 bg-green-50 text-[var(--primary-color)] border border-[var(--primary-color)] rounded-md text-xs font-medium">
                                            {item.stockStatus || "In stock"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-4">
                                            <Button1 
                                                onClick={() => handleAddToCart(item)}
                                                className="flex items-center gap-2"
                                            >
                                                <FaCartPlus /> Add to Cart
                                            </Button1>
                                            <button 
                                                onClick={() => handleRemove(item._id || item.id)}
                                                className="flex items-center gap-1.5 text-red-500 hover:underline text-sm font-medium"
                                            >
                                                <FaTrash className="text-xs" /> Remove
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center gap-4 text-[var(--text-muted)]">
                                        <p className="text-lg">Your wishlist is empty.</p>
                                        <Button1 onClick={() => navigate(paths.products)}>
                                            Explore Products
                                        </Button1>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="p-6 border-t border-[var(--border-color)]">
                <button 
                    onClick={() => navigate(paths.home)}
                    className="flex items-center gap-2 text-[var(--primary-color)] hover:underline font-bold"
                >
                    <FaChevronLeft className="text-xs" /> Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default Wishlist;
