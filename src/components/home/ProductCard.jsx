import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { toggleSidebar, addItemOptimistically } from '../../redux/slices/cartSlice';
import { BsCart3, BsCartCheck, BsHeart, BsHeartFill, BsCheck2Circle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import paths from '../../path/path';

const ProductCard = (props) => {
  const { _id, id, images, image, tag, name, longDescription, description, mrp, sellingPrice, price, oldPrice, onCartClick, onWishlistClick, showCheck } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const productId = _id || id;
  const productImages = images || (image ? [image] : []);
  const productPrice = sellingPrice || price;
  const productMrp = mrp || oldPrice;
  const productDescription = longDescription || description;

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const isInWishlist = wishlistItems.some((item) => (item._id === productId || item.id === productId));
  const isInCart = cartItems.some((item) => (item.productId?._id || item.productId || item.id) === productId);

  const handleCartClick = (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate(paths.login);
      return;
    }

    if (isInCart) {
      dispatch(toggleSidebar(true));
    } else {
      if (onCartClick) onCartClick();
      dispatch(addItemOptimistically(productId));
      toast.success(`${name} added to cart!`);
    }
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error("Please login to manage wishlist");
      navigate(paths.login);
      return;
    }

    if (onWishlistClick) {
      onWishlistClick();
    } else {
      const product = {
        ...props,
        _id: productId,
        images: productImages,
        sellingPrice: productPrice,
        mrp: productMrp,
        longDescription: productDescription
      };
      dispatch(toggleWishlist(product));
    }
  };

  const getTagColor = (tag) => {
    switch (tag?.toLowerCase()) {
      case 'organic': return 'bg-orange-500';
      case 'healthy': return 'bg-orange-500';
      case 'natural': return 'bg-orange-500';
      default: return 'bg-[var(--primary-color)]';
    }
  };

  const handleNavigate = (e) => {
    // Prevent navigation if clicking on cart or wishlist buttons
    if (e.target.closest('button')) return;
    navigate(`/product/${productId}`);
  };

  const displayImage = Array.isArray(productImages) ? productImages[0] : (productImages || image);

  return (
    <div
      onClick={handleNavigate}
      className="bg-[var(--white)] h-full w-full rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 group relative flex flex-col cursor-pointer"
    >
      {/* Check Icon */}
      {showCheck && (
        <div className="absolute top-5 left-4 z-20">
          <div className="bg-[var(--primary-color)] text-white p-1 rounded-md shadow-sm">
            <BsCheck2Circle size={16} />
          </div>
        </div>
      )}

      {/* Tag */}
      {tag && (
        <span className={`absolute top-5 left-4 ${getTagColor(tag)} text-white text-[10px] font-bold px-3 py-1 rounded-md z-10 uppercase tracking-wider`}>
          {tag}
        </span>
      )}

      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden flex items-center justify-center">
        <img
          src={displayImage}
          alt={name}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow mt-5">
        <h3 className="text-xl font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--primary-color)] transition-colors line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 leading-relaxed">
          {productDescription}
        </p>

        {/* Bottom Section: Price and Actions */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
          <div className="flex items-center gap-1">
            <span className="text-xl font-extrabold text-[var(--text-main)]">
              ₹{productPrice}
            </span>
            {productMrp && productMrp !== productPrice && (
              <span className="text-sm text-[var(--text-light)] line-through">
                ₹{productMrp}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleWishlistClick}
              className={`p-2.5 rounded-full bg-gray-50 transition-all duration-300 shadow-sm cursor-pointer ${
                isInWishlist ? 'text-red-500' : 'text-[var(--text-light)] hover:text-red-500'
              }`}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isInWishlist ? <BsHeartFill size={18} /> : <BsHeart size={18} />}
            </button>
            <button
              onClick={handleCartClick}
              className={`p-2.5 rounded-full transition-all duration-300 shadow-lg group-hover:scale-110 cursor-pointer ${
                isInCart 
                  ? 'bg-orange-500 text-white shadow-orange-100' 
                  : 'bg-[var(--primary-color)] text-white hover:bg-[var(--primary-dark)] shadow-green-100'
              }`}
              aria-label={isInCart ? "Go to cart" : "Add to cart"}
            >
              {isInCart ? <BsCartCheck size={18} /> : <BsCart3 size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
