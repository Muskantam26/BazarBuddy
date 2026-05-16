import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCart3, BsCartCheck, BsHeart, BsHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { toggleSidebar, addItemOptimistically } from '../../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import paths from '../../path/path';

const ProductCardList = (props) => {
  const { _id, id, image, images, tag, name, description, price, sellingPrice, oldPrice, mrp, onCartClick, onWishlistClick } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const productId = _id || id;
  const productPrice = sellingPrice || price;
  const productMrp = mrp || oldPrice;
  const productDisplayImage = (images && Array.isArray(images) && images[0]) || image;

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const isInWishlist = wishlistItems.some((item) => item._id === productId || item.id === productId);
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
        _id: productId,
        images: [productDisplayImage],
        name,
        sellingPrice: productPrice,
        mrp: productMrp,
        longDescription: description,
        tag
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
    if (e.target.closest('button')) return;
    navigate(`/product/${productId}`);
  };

  return (
    <div 
      onClick={handleNavigate}
      className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row gap-6 items-center cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full md:w-64 h-48 rounded-xl border border-gray-50 overflow-hidden flex items-center justify-center p-4 bg-white flex-shrink-0">
        {tag && (
          <span className={`absolute top-3 left-3 ${getTagColor(tag)} text-white text-[10px] font-bold px-3 py-1 rounded-md z-10 uppercase tracking-wider`}>
            {tag}
          </span>
        )}
        <img
          src={productDisplayImage}
          alt={name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col py-2 w-full">
        <div className="flex flex-col mb-4">
          <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2 group-hover:opacity-80 transition-opacity">
            {name}
          </h3>
          <p className="text-[var(--text-muted)] text-[15px] leading-relaxed line-clamp-2 md:line-clamp-3">
            {description}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-[var(--text-main)]">
              ₹{productPrice}
            </span>
            {productMrp && productMrp !== productPrice && (
              <span className="text-sm text-[var(--text-light)] line-through">
                ₹{productMrp}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleWishlistClick}
              className={`p-2.5 rounded-full bg-gray-50 transition-all duration-300 shadow-sm ${
                isInWishlist ? 'text-red-500' : 'text-[var(--text-light)] hover:text-red-500'
              }`}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isInWishlist ? <BsHeartFill size={20} /> : <BsHeart size={20} />}
            </button>
            <button
              onClick={handleCartClick}
              className={`p-3 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center ${
                isInCart 
                  ? 'bg-orange-50 text-white shadow-orange-100' 
                  : 'bg-[var(--primary-color)] text-white hover:bg-[var(--primary-dark)] shadow-green-100'
              }`}
              aria-label={isInCart ? "Go to cart" : "Add to cart"}
            >
              {isInCart ? <BsCartCheck size={20} /> : <BsCart3 size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardList;
