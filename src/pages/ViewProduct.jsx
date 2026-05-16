import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { incrementCount, toggleSidebar, addItemOptimistically } from '../redux/slices/cartSlice';
import { BsCart3, BsCartCheck, BsHeart, BsHeartFill, BsCheck2Circle, BsChevronLeft, BsChevronRight, BsPlus, BsDash } from 'react-icons/bs';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import ProductCard from '../components/home/ProductCard';
import SectionHeader from '../components/ui/SectionHeader';
import Button1 from '../components/ui/Button1';

// Import assets
import piriPiriImg from '../assets/piri_piri.png';
import tangyTomatoImg from '../assets/tangy_tomato.png';
import webDevImg from '../assets/web_dev_course.png';
import eggsImg from '../assets/fresh_eggs.png';
import pomegranateImg from '../assets/fresh_pomegranate.png';
import onionImg from '../assets/onion.png';

import { useParams } from "react-router-dom";
import { products as mockProducts } from '../data/mockData';
import { backendConfig } from '../constants/constant/Maincontent';
import toast from 'react-hot-toast';
import paths from '../path/path';

const ViewProduct = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [selectedImage, setSelectedImage] = useState(0);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  
  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  
  const isInWishlist = product ? wishlistItems.some((item) => item._id === product._id) : false;
  const isInCart = product ? cartItems.some((item) => (item.productId?._id || item.productId || item.id) === product._id) : false;

  const handleToggleWishlist = () => {
    if (!isAuthenticated) {
      toast.error("Please login to manage wishlist");
      navigate(paths.login);
      return;
    }
    if (product) {
      dispatch(toggleWishlist(product));
    }
  };

  const handleCartAction = () => {
    if (!isAuthenticated) {
        toast.error("Please login to add items to cart");
        navigate(paths.login);
        return;
    }

    if (isInCart) {
      dispatch(toggleSidebar(true));
    } else {
      handleAddToCart();
      dispatch(addItemOptimistically(product._id));
    }
  };

  useEffect(() => {
    if (_id) {
      setLoading(true);
      const foundProduct = mockProducts.find(p => p._id === _id || p.id === _id);
      if (foundProduct) {
        // Ensure images is an array
        const productData = { ...foundProduct };
        if (!productData.images && productData.image) {
          productData.images = [productData.image];
        }
        setProduct(productData);
      } else {
        setError("Product not found");
      }
      setLoading(false);
    }
  }, [_id]);

  const handleAddToCart = async () => {
    toast.success("Product added to cart!");
    // window.dispatchEvent(new Event('cartUpdated')); // No longer needed as Redux handles it
  };

  const bundleItems = [
    {
      id: 1,
      name: "Parle's Wafers",
      image: tangyTomatoImg,
      tag: "Natural",
      price: 50.0,
      oldPrice: 55.0,
      description: "Parle's Wafers are a popular line of potato chips crafted from handpicked..."
    },
    {
      id: 2,
      name: "Web Development Course",
      image: webDevImg,
      tag: "Healthy",
      price: 150.0,
      oldPrice: 200.0,
      description: "Complete web development course with video tutorials"
    },
    {
      id: 3,
      name: "Parle's Wafers",
      image: tangyTomatoImg,
      tag: "Natural",
      price: 50.0,
      oldPrice: 55.0,
      description: "Parle's Wafers are a popular line of potato chips crafted from handpicked..."
    }
   
  ];

  const relatedProducts = product ? mockProducts
    .filter(p => p.category === product.category && (p._id !== product._id && p.id !== product.id))
    .slice(0, 4) : [];

  const tabs = ["Description", "Specification", "Question & Answer", "Product Enquiry", "Size Chart", "Additional Fields"];

  const handleQuantityChange = (type) => {
    if (type === 'plus') setQuantity(q => q + 1);
    else if (type === 'minus' && quantity > 1) setQuantity(q => q - 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <h2 className="text-2xl font-bold text-gray-700">{error || "Product not found"}</h2>
        <Button1 onClick={() => navigate('/')}>Go Back Home</Button1>
      </div>
    );
  }

  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };
  
  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <div className=" mx-auto px-4 py-8 md:py-15 ">
      {/* Product Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg   w-full items-start bg-[var(--white)] ">
        {/* Left: Image Gallery */}
        <div className="space-y-4 p-4 md:p-7">
          <div className="relative m-2 md:m-5 border border-gray-200  rounded-lg overflow-hidden group">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="object-contain w-full h-full transition-transform  duration-500 hover:scale-105"
              />
            ) : (
              <div className="aspect-square bg-gray-100 flex items-center justify-center">No Image</div>
            )}
            {/* Arrows */}
            {product.images && product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--primary-color)] text-[var(--white)] shadow-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                >
                  <BsChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--primary-color)] text-[var(--white)] shadow-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                >
                  <BsChevronRight size={20} />
                </button>
              </>
            )}
            
          </div>
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square  border rounded-2xl overflow-hidden cursor-pointer transition-all  ${selectedImage === idx ? 'border-[var(--primary-color)] shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          )}
            </div>

          {/* Right: Product Info */}
          <div className="flex flex-col pt-6 md:pt-12   ">
            <div className="">
              <span className="text-[var(--primary-color)] bg-[var(--primary-light)] px-3 py-1 inline-block font-semibold text-sm  rounded ">{product.tag}</span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-[var(--heading-dark)] mb-4">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl md:text-2xl font-bold text-[var(--text-main)]">₹{(product.sellingPrice || product.price || 0).toFixed(1)}</span>
                {(product.mrp || product.oldPrice) && (
                  <span className="text-base md:text-lg text-[var(--text-light)] line-through">₹{(product.mrp || product.oldPrice).toFixed(1)}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[var(--primary-color)]  font-medium mb-6">
                <BsCheck2Circle />
                <span>{product.stockStatus || (product.stock > 0 ? "In Stock" : "Out of Stock")}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-8">
              <p className=" text-lg leading-relaxed">
                <span className="font-bold text-[var(--text-main)]">{product.name}</span> {product.description ? product.description.replace(product.name, "") : ""}
              </p>
            </div>

            <div className="space-y-6">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg text-[var(--heading-dark)]">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-sm  bg-gray-50">
                  <button
                    onClick={() => handleQuantityChange('minus')}
                    className="p-2.5 border-r border-gray-300 hover:bg-white  transition-colors bg-gray-100"
                  >
                    <BsDash size={18} />
                  </button>
                  <span className="px-6  text-gray-700 text-lg text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange('plus')}
                    className=" p-2.5 border-l border-gray-300 hover:bg-white  transition-colors bg-gray-100"
                  >
                    <BsPlus size={18} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Button1 
                    onClick={handleCartAction}
                    className={`w-full md:w-fit px-8 md:px-28 py-3 flex items-center justify-center gap-2 ${isInCart ? '!bg-orange-500 hover:!bg-orange-600' : ''}`}
                  >
                    {isInCart ? <BsCartCheck size={22} /> : <HiOutlineShoppingBag size={22} />}
                    {isInCart ? "Go to cart" : "Add to cart"}
                  </Button1>
                  <button
                    onClick={handleToggleWishlist}
                    className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 font-bold ${
                      isInWishlist 
                        ? 'bg-red-50 border-red-200 text-red-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {isInWishlist ? <BsHeartFill size={24} /> : <BsHeart size={24} />}
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button1 className="w-full sm:w-fit py-3">
                    Add Review
                  </Button1>
                  <Button1 className="w-full sm:w-fit py-3">
                    Wholesale Pricing
                  </Button1>
                </div>
              </div>
            </div>
          
          </div>
        

      

      {/* Tabs Section */}
      <div className="w-full mt-10 md:col-span-2 border-t border-gray-200">
        <div className="flex border-b border-gray-200 w-full overflow-x-auto no-scrollbar scroll-smooth">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-8 py-4 md:py-5 text-base cursor-pointer   md:text-[17px] font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === tab
                  ? 'border-[var(--primary-color)] text-[var(--primary-color)] bg-white'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 md:p-8">
          {activeTab === "Description" && (
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-bold text-[var(--heading-dark)]">
                <span className="text-[var(--primary-color)]">◆</span> Description
              </h3>
              <p className="text-[var(--text-muted)]  leading-relaxed w-full">
                {product.detailedDescription || product.description}
              </p>
            </div>
          )}
          {activeTab === "Specification" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody >
                  {product.specifications ? product.specifications.map((spec, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 px-2 font-bold text-[var(--heading-dark)] w-1/3 md:w-1/4 align-top">{spec.label}</td>
                      <td className="py-3 px-2 text-[var(--text-muted)]">{spec.value}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td className="py-3 px-2 text-[var(--text-muted)]">No specifications available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {activeTab !== "Description" && activeTab !== "Specification" && (
            <div className="text-[var(--text-muted)] text-center py-8">
              Content for {activeTab} will be available soon.
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Frequently Bought Together */}
      <div className="mt-15">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--heading-dark)] mb-2 text-center px-4">Frequently Bought Together</h2>
        <p className="text-[var(--text-muted)] text-center mb-10 px-4">Customers who bought these items together saved more</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start bg-[var(--white)] p-4 md:p-8 rounded-3xl border border-gray-100">
          
          <div className="lg:col-span-3 flex flex-col md:flex-row flex-wrap justify-center items-center gap-y-6 md:gap-y-10">
            {bundleItems.map((item, idx) => (
              <div key={item.id} className="w-full md:w-[48%] lg:w-[35%] flex flex-col md:flex-row items-center justify-center p-2 relative">
                <div className="max-w-[350px] w-full">
                  <ProductCard
                    _id={item.id}
                    id={item.id}
                    image={item.image}
                    tag={item.tag}
                    name={item.name}
                    description={item.description}
                    price={item.price.toFixed(1)}
                    oldPrice={item.oldPrice?.toFixed(1)}
                    showCheck={true}
                  />
                </div>
                {idx < bundleItems.length - 1 && (
                  <div className="mt-4 md:mt-0 md:ml-4 bg-[var(--primary-color)] p-2 rounded-full text-white shadow-lg shrink-0 z-10">
                    <BsPlus size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-[var(--primary-light)] p-6 md:p-4 rounded-3xl border border-[var(--primary-color)] lg:col-span-1 text-center flex flex-col items-center mt-6 lg:mt-0">
            <div className="w-14 h-14 bg-[var(--primary-light)] rounded-full flex items-center justify-center text-[var(--primary-color)] mb-4">
              <span className="font-bold text-lg">₹</span>
            </div>
            <h4 className="text-2xl font-extrabold text-[var(--heading-dark)] mb-1">Bundle Deal</h4>
            <p className="text-sm text-[var(--text-muted)] mb-6">Save when you buy together</p>
            <div className="w-full h-px bg-gray-200/50 mb-6"></div>
            <div className="flex items-center justify-between w-full mb-8">
              <span className="font-bold text-[var(--text-main)] text-lg">Total Price:</span>
              <span className="text-xl md:text-2xl font-black text-[var(--primary-color)]">₹ 249.99</span>
            </div>
            
            <Button1 className='w-full py-4 flex items-center justify-center gap-2 rounded-xl'>
              <BsCart3 size={20} />
              Add Bundle to Cart
            </Button1>
          </div>
        </div>
      </div>


      {/* Related Products Slider */}
      {relatedProducts.length > 0 && (
        <div className="mt-15 ">
          <SectionHeader
            title="Related Products"
            linkText="View All products"
            linkPath="/products"
          />
          <div className="relative group">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item._id || item.id}
                  _id={item._id || item.id}
                  id={item._id || item.id}
                  image={item.image}
                  tag={item.tag}
                  name={item.name}
                  description={item.description}
                  price={item.sellingPrice || item.price}
                  oldPrice={item.mrp || item.oldPrice}
                />
              ))}
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ViewProduct;