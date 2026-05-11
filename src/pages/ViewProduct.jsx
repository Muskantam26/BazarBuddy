import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCart3, BsHeart, BsCheck2Circle, BsChevronLeft, BsChevronRight, BsPlus, BsDash } from 'react-icons/bs';
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

const ViewProduct = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    id: 1,
    name: "Parle's Wafers",
    tag: "Natural",
    price: 50.0,
    oldPrice: 55.0,
    stockStatus: "In Stock",
    description: "Parle's Wafers are a popular line of potato chips crafted from handpicked potatoes and seasoned with a variety of flavors to cater to diverse taste preferences. Known for their light and crispy texture, these wafers are a go-to snack for many.",
    detailedDescription: "Parle's Wafers are thinly sliced potato chips that deliver a satisfying crunch in every bite. They are available in multiple flavors, including Classic Salted, Cream n' Onion, Masala Masti, Tangy Tomato, Piri Piri, Aloo Chaat, and Subtle Onion. These wafers are vegetarian-friendly and come in convenient pouch packaging, making them ideal for on-the-go snacking or sharing with friends and family.",
    images: [piriPiriImg, tangyTomatoImg, onionImg, tangyTomatoImg],
    specifications: [
      { label: "Brand", value: "Parle" },
      { label: "Product Type", value: "Potato Chips" },
      { label: "Flavors Available", value: "Classic Salted, Cream n' Onion, Masala Masti, Tangy Tomato, Piri Piri, Aloo Chaat, Subtle Onion" },
      { label: "Packaging", value: "Pouch" },
      { label: "Weight Variants", value: "60g, 70g, 75g, 85g, 110g" },
      { label: "Shelf Life", value: "Approximately 4 to 6 months" },
      { label: "Dietary Preference", value: "Vegetarian" },
      { label: "Country of Origin", value: "India" },
    ],
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

  const bestsellers = [
    {
      id: 101,
      name: "Fresh Eggs, Packs",
      image: eggsImg,
      tag: "Organic",
      price: 500.0,
      oldPrice: 540.0,
      description: "Fresh eggs are a staple in many households, valued for their versatility and nutritional..."
    },
    {
      id: 102,
      name: "Parle's Wafers",
      image: tangyTomatoImg,
      tag: "Natural",
      price: 50.0,
      oldPrice: 55.0,
      description: "Parle's Wafers are a popular line of potato chips crafted from handpicked potatoes and..."
    },
    {
      id: 103,
      name: "Fresh Organic Pomegranate",
      image: pomegranateImg,
      tag: "Healthy",
      price: 500.0,
      description: "Fresh Organic Pomegranates are cultivated without synthetic pesticides or fertilizers,..."
    },
    {
      id: 104,
      name: "Fresh Eggs, Packs",
      image: eggsImg,
      tag: "Organic",
      price: 500.0,
      oldPrice: 540.0,
      description: "Fresh eggs are a staple in many households, valued for their versatility and nutritional..."
    }
  ];

  const tabs = ["Description", "Specification", "Question & Answer", "Product Enquiry", "Size Chart", "Additional Fields"];

  const handleQuantityChange = (type) => {
    if (type === 'plus') setQuantity(q => q + 1);
    else if (type === 'minus' && quantity > 1) setQuantity(q => q - 1);
  };

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <div className=" mx-auto px-4 py-8 md:py-15 ">
      {/* Product Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg   w-full items-start bg-[var(--white)] ">
        {/* Left: Image Gallery */}
        <div className="space-y-4 p-4 md:p-7">
          <div className="relative m-2 md:m-5 border border-gray-200  rounded-lg overflow-hidden group">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="object-contain  transition-transform  duration-500 hover:scale-105"
            />
            {/* Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--primary-color)] text-[var(--white)] hover:bg-[var(--primary-color)] hover:text-[var(--white)] shadow-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <BsChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--primary-color)] text-[var(--white)] hover:bg-[var(--primary-color)] hover:text-[var(--white)] shadow-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <BsChevronRight size={20} />
            </button>
            
          </div>
          {/* Thumbnails */}
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
            </div>

          {/* Right: Product Info */}
          <div className="flex flex-col pt-6 md:pt-12   ">
            <div className="">
              <span className="text-[var(--primary-color)] bg-[var(--primary-light)] px-3 py-1 inline-block font-semibold text-sm  rounded ">{product.tag}</span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-[var(--heading-dark)] mb-4">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl md:text-2xl font-bold text-[var(--text-main)]">${product.price.toFixed(1)}</span>
                {product.oldPrice && (
                  <span className="text-base md:text-lg text-[var(--text-light)] line-through">${product.oldPrice.toFixed(1)}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[var(--primary-color)]  font-medium mb-6">
                <BsCheck2Circle />
                <span>{product.stockStatus}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-8">
              <p className=" text-lg leading-relaxed">
                <span className="font-bold text-[var(--text-main)]">{product.name}</span> {product.description.replace(product.name, "")}
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
                <Button1 className="w-full md:w-fit px-8 md:px-35 py-3 flex items-center justify-center gap-2">
                  <HiOutlineShoppingBag size={22} />
                  Add to cart
                </Button1>
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
              className={`px-4 md:px-8 py-4 md:py-5 text-base md:text-[17px] font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === tab
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
                {product.detailedDescription}
              </p>
            </div>
          )}
          {activeTab === "Specification" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {product.specifications.map((spec, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 px-2 font-bold text-[var(--heading-dark)] w-1/3 md:w-1/4 align-top">{spec.label}</td>
                      <td className="py-3 px-2 text-[var(--text-muted)]">{spec.value}</td>
                    </tr>
                  ))}
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
                    id={item.id}
                    image={item.image}
                    tag={item.tag}
                    name={item.name}
                    description={item.description}
                    price={item.price.toFixed(1)}
                    oldPrice={item.oldPrice?.toFixed(1)}
                    showCheck={true}
                    onCartClick={() => console.log('Cart clicked')}
                    onWishlistClick={() => console.log('Wishlist clicked')}
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
              <span className="font-bold text-lg">$</span>
            </div>
            <h4 className="text-2xl font-extrabold text-[var(--heading-dark)] mb-1">Bundle Deal</h4>
            <p className="text-sm text-[var(--text-muted)] mb-6">Save when you buy together</p>
            <div className="w-full h-px bg-gray-200/50 mb-6"></div>
            <div className="flex items-center justify-between w-full mb-8">
              <span className="font-bold text-[var(--text-main)] text-lg">Total Price:</span>
              <span className="text-xl md:text-2xl font-black text-[var(--primary-color)]">$ 249.99</span>
            </div>
            
            <Button1 className='w-full py-4 flex items-center justify-center gap-2 rounded-xl'>
              <BsCart3 size={20} />
              Add Bundle to Cart
            </Button1>
          </div>
        </div>
      </div>


      {/* Related Products Slider */}
      <div className="mt-15 ">
        <SectionHeader
          title="Bestseller Product"
          linkText="View All products"
          linkPath="/products"
        />
        <div className="relative group">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                image={item.image}
                tag={item.tag}
                name={item.name}
                description={item.description}
                price={item.price.toFixed(1)}
                oldPrice={item.oldPrice?.toFixed(1)}
                onCartClick={() => console.log('Cart clicked')}
                onWishlistClick={() => console.log('Wishlist clicked')}
              />
            ))}
          </div>

          {/* Navigation Arrows for Slider (Desktop) */}
          {/* <button className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-[var(--primary-color)] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all border border-gray-100 hover:bg-green-50 z-10">
            <BsChevronLeft size={18} />
          </button>
          <button className="absolute -right-2 md:-right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--primary-color)] shadow-xl flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-[var(--primary-dark)] z-10">
            <BsChevronRight size={18} />
          </button> */}
        </div>
      </div>


    </div>
  );
};

export default ViewProduct;