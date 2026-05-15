import React, { useEffect, useState } from 'react';
import HeroCard from '../components/HeroCard';
import paths from '../path/path';
import SectionHeader from '../components/ui/SectionHeader';
import CategoryCard from '../components/home/CategoryCard';
import ProductCard from '../components/home/ProductCard';
import CategoryBanner from '../components/home/CategoryBanner';


import veg from "../assets/veg.png"
import snc from "../assets/snc.png"
import gro from "../assets/gro.png"
import frt from "../assets/fruits.png"
import bvg from "../assets/bev.png"
import eggs from "../assets/egg.png"
import dri from "../assets/dairy.png"
import sea from "../assets/sea.png"

// Images
import onionImg from "../assets/onion.png";
import tomatoImg from "../assets/tomato.png";
import potatoImg from "../assets/potato.png";
import juiceImg from "../assets/swing.png";
import bannerVeg from "../assets/vagetables.png";
import bannerSnacks from "../assets/snacks.png";
import bannerGroceries from "../assets/groceries.png";
import Brands from '../components/home/Brands';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import TestimonialCard from '../components/home/TestimonialCard';
import BlogCard from '../components/home/BlogCard';
import Newsletter from '../components/home/Newsletter';
import FilterButton from '../components/ui/FilterButton';
import { getAllCategories } from '../api/Categories-api';
import { getAllProducts } from '../api/Product-api';
import { addToCart } from '../api/Cart-api';
import { backendConfig } from '../constants/constant/Maincontent';
import toast from 'react-hot-toast';



import brand1 from "../assets/org.png";
import brand2 from "../assets/ptr.png";
import brand3 from "../assets/str.png";
import brand4 from "../assets/healthy.png";
import brand5 from "../assets/organic.png";
import brand6 from "../assets/fr.png";
import brand7 from "../assets/app.png";




// fetatured img


import klass from "../assets/klass.png"
import makka from "../assets/makka.png"
import mango from "../assets/mango.png"
import freshegg from "../assets/freshegg.png"
import banner1 from '../assets/home-banner-3.png';
import banner2 from '../assets/home-banner-2.png';
import banner3 from '../assets/home-banner-1.png';

import offerbg from '../assets/offer-bg.png';
import { useNavigate } from 'react-router-dom';

import { incrementCount, addItemOptimistically } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
    const [activeFilter, setActiveFilter] = useState('All Products');
    const filters = ['All Products', 'Vegetables', 'Snacks', 'Groceries'];
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsLoading, setProductsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchCategories = async () => {


        setLoading(true);
        try {
            const res = await getAllCategories();
            console.log("Categories API Response:", res);
            if (res.success) {
                const categoriesData = Array.isArray(res.data)
                    ? res.data
                    : (res.data?.categories || res.categories || []);

                const formattedCategories = categoriesData.map(cat => ({
                    name: cat.name || cat.categoryName,
                    Image: (cat.image || cat.img)?.startsWith('http') 
                        ? (cat.image || cat.img) 
                        : `${backendConfig.origin}/${cat.image || cat.img}`,
                    path: `/category/${cat._id || cat.id}`
                }));

                setCategories(formattedCategories);
            } else {
                toast.error(res.message || "Failed to fetch categories");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error(
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong while fetching categories"
            );
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        setProductsLoading(true);
        try {
            const res = await getAllProducts();
            console.log("Products API Response:", res);
            if (res.success) {
                const productsData = Array.isArray(res.data)
                    ? res.data
                    : (res.data?.products || res.products || []);
                
                const formattedProducts = productsData.map(p => ({
                    ...p,
                    image: (p.image || p.img || p.images?.[0])?.startsWith('http')
                        ? (p.image || p.img || p.images?.[0])
                        : `${backendConfig.origin}/${p.image || p.img || p.images?.[0]}`
                }));
                setAllProducts(formattedProducts);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setProductsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const handleAddToCart = async (productId, productName) => {
        try {
            const res = await addToCart(productId, 1);
            if (res.success) {
                toast.success(res.message || `${productName} added to cart!`);
                // Instant update via Redux
                dispatch(incrementCount(1));
                dispatch(addItemOptimistically(productId));
                // Trigger navbar update (for any other components listening)
                window.dispatchEvent(new Event('cartUpdated'));
            } else {
                toast.error(res.message || "Failed to add to cart");
            }
        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    const heroSlides = [
        {
            id: 1,
            image: banner1,
            subtitle: 'FRESH & ORGANIC',
            titlePart1: 'Pure Taste From',
            titlePart2: 'Local ',
            titleHighlight: 'Farms',
            description: 'Fresh ingredients grown naturally for hash to your familys meals.',
            buttonText: 'Shop Now'
        },
        {
            id: 2,
            image: banner2,
            subtitle: '100% ORGANIC QUALITY',
            titlePart1: 'Get 10% Cashback',
            titlePart2: 'On First ',
            titleHighlight: 'Order',
            description: 'Special weekend offers available exclusively for you and your family.',
            buttonText: 'Get Offer'
        },
        {
            id: 3,
            image: banner3,
            subtitle: 'FRESH EVERYDAY',
            titlePart1: 'Premium Quality',
            titlePart2: 'Meat & ',
            titleHighlight: 'Seafood',
            description: 'Sourced directly from local farms and the best catch of the day.',
            buttonText: 'Shop Now'
        }
    ];

    const offerSlides = [
        {
            id: 1,
            image: offerbg,
            subtitle: 'Save Up To 30% OFF',
            titlePart1: 'Big Deals trending of Week & fresh products',
            titlePart2: '',
            titleHighlight: '',
            description: '',
            buttonText: 'Shop Now'
        }
    ];



    const products = [
        {
            id: 1,
            image: onionImg,
            tag: "Organic",
            name: "Fresh Onion",
            description: "Fresh onions are a fundamental ingredient in global cuisines, prized for their distinctive...",
            price: "152.0",
            oldPrice: "190.0"
        },
        {
            id: 2,
            image: tomatoImg,
            tag: "Healthy",
            name: "Fresh Tomato",
            description: "Fresh tomatoes are versatile fruits widely used in culinary applications across the globe. The...",
            price: "256.0",
            oldPrice: "320.0"
        },
        {
            id: 3,
            image: potatoImg,
            tag: "Natural",
            name: "Fresh Potato",
            description: "Fresh potatoes (Solanum tuberosum) are staple tuber vegetables cultivated globally...",
            price: "120.0",
            oldPrice: "150.0"
        },
        {
            id: 4,
            image: juiceImg,
            tag: "Natural",
            name: "Mango Fruit Juice",
            description: "Refreshing mango-flavored beverage packaged in a convenient bottle for on-the-go enjoyment.",
            price: "72.0",
            oldPrice: "90.0"
        }
    ];

    const banners = [
        { name: "Vegetables", image: bannerVeg, path: "/vegetables" },
        { name: "Snacks", image: bannerSnacks, path: "/snacks" },
        { name: "Groceries", image: bannerGroceries, path: "/groceries" },
    ];

    const brands = [
        { Image: brand1 },
        { Image: brand2 },
        { Image: brand3 },
        { Image: brand4 },
        { Image: brand5 },
        { Image: brand6 },
        { Image: brand7 },
    ];




    const Featured = [
        {
            id: 1,
            image: klass,
            tag: "Natural",
            name: "Klaas River Salmon Fillets 500 g| ",
            description: "Klaas River Salmon (Indian Basa) Fillets are frozen fish fillets marketed under the River Salmon label. Despite the name, these fillets are made from Indian Basa (Pangasius), a freshwater fish known for its mild flavor and tender texture. They are versatile and suitable for various cooking methods, including grilling, baking, and pan-frying....",
            price: "1500.0",
            oldPrice: "1580.0"
        },
        {
            id: 2,
            image: makka,
            tag: "Healthy",
            name: "Makka Popcorn, Jumbo Mushroom Corn Kernels, Healthy, Reusable Bottle",
            description: "4700BC Makka Popcorn Jumbo Mushroom Corn Kernels are premium-quality, unpopped popcorn kernels known for their large, round mushroom shape upon popping. Packaged in a reusable bottle, these kernels are ideal for creating gourmet-style popcorn at home.",
            price: "256.0",
            oldPrice: "320.0"
        },
        {
            id: 3,
            image: mango,
            tag: "Natural",
            name: "Fresh Mango, Alphonso Ratnagiri",
            description: "Fresh Organic Pomegranates are cultivated without the use of synthetic pesticides or fertilizers, ensuring a natural and healthful fruit. Known for their vibrant red hue and juicy arils, these pomegranates are a rich source of antioxidants, vitamins, and minerals, making them a nutritious addition to your diet.",
            price: "In variant",
            oldPrice: ""
        },
        {
            id: 4,
            image: freshegg,
            tag: "organic",
            name: "Fresh Eggs, Packs",
            description: "Fresh eggs are a staple in many households, valued for their versatility and nutritional benefits. They are available in various pack sizes, with the 30-piece tray being a popular choice for families and individuals who consume eggs regularly.",
            price: "500",
            oldPrice: "540.0"
        }
    ];

    const digitalProducts = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop",
            tag: "Natural",
            name: "Stock Photo",
            description: "",
            price: "450.0",
            oldPrice: "500.0"
        }

    ];

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
            rating: 5,
            review: "I've been shopping here for over a year now and the quality of their organic produce is consistently excellent. The delivery is always on time and the customer service is top notch!"
        },
        {
            id: 2,
            name: "David Wilson",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            rating: 4,
            review: "Their weekly subscription box has been a game-changer for my family. We get fresh, seasonal produce delivered right to our doorstep. The variety keeps our meals exciting and healthy."
        },
        {
            id: 3,
            name: "Emma Thompson",
            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
            rating: 5,
            review: "As a health-conscious individual, I appreciate their wide selection of organic products. The quality is always top-notch and the prices are reasonable for organic produce."
        },
        {
            id: 4,
            name: "Michael Chen",
            avatar: "https://randomuser.me/api/portraits/men/4.jpg",
            rating: 5,
            review: "Best organic store in town. Everything I've bought has been super fresh and flavorful. Highly recommend their local farm selection!"
        }
    ];

    const blogPosts = [
        {
            id: 1,
            tag: "ORGANIC",
            date: "2025-06-04 12:47:37",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2048&auto=format&fit=crop",
            title: "The Health Benefits Of Organic Food Trusted Food",
            description: "Exploring innovative farming techniques that promote environmental sustainability and produce healthier food for your family.",
            path: "/blog/organic-benefits"
        },
        {
            id: 2,
            tag: "HEALTH",
            date: "2025-06-04 12:48:11",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
            title: "Seasonal Eating: Why It Matters For Your Health",
            description: "Discover the nutritional benefits of eating with the seasons and how this practice can improve your overall well-being.",
            path: "/blog/seasonal-eating"
        },
        {
            id: 3,
            tag: "FARMING",
            date: "2025-06-04 12:48:44",
            image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2070&auto=format&fit=crop",
            title: "5 Simple Fruit Desserts That Require No Baking",
            description: "Beat the heat with these refreshing no-bake fruit desserts that highlight the natural sweetness of seasonal produce.",
            path: "/blog/fruit-desserts"
        },
        {
            id: 4,
            tag: "TIPS",
            date: "2025-06-04 12:49:36",
            image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=2042&auto=format&fit=crop",
            title: "How To Properly Store Produce To Maximize Freshness",
            description: "Simple storage techniques that will extend the life of your fruits and vegetables, reducing waste and saving money.",
            path: "/blog/storage-tips"
        }
    ];

    return (
        <div className=" ">
            <section className='mt-10'>

                <HeroCard slides={heroSlides} showArrows={true} />
            </section>

            {/* Product Categories Section */}
            <section className='mt-10 p-4 '>
                <SectionHeader
                    title="Product Categories"
                    linkText="View All Categories"
                    onClick={() => navigate(paths.collections)}
                />
                {loading ? (
                    <div className="flex justify-center items-center min-h-[150px]">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--primary-color)]"></div>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[150px] text-gray-500">
                        <p className="text-lg font-semibold">No categories found</p>
                        <button
                            onClick={fetchCategories}
                            className="mt-2 text-[var(--primary-color)] hover:underline"
                        >
                            Try again
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                            {categories.map((cat, index) => (
                                <CategoryCard key={index} {...cat} />
                            ))}
                        </div>
                        <div className="md:hidden">
                            <Swiper
                                spaceBetween={15}
                                slidesPerView={2}
                                navigation={true}
                                modules={[Navigation]}
                                className="category-slider "
                            >
                                {categories.map((cat, index) => (
                                    <SwiperSlide key={index}>
                                        <CategoryCard {...cat} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </>
                )}
            </section>

            {/* Bestseller Products Section */}
            <section className='mt-10 p-4'>
                <SectionHeader
                    title="Bestseller Product"
                    linkText="View All products"
                     onClick={()=>navigate(paths.products)}
                />
                <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {productsLoading ? (
                         <div className="col-span-full flex justify-center items-center min-h-[200px]">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--primary-color)]"></div>
                        </div>
                    ) : allProducts.length > 0 ? (
                        allProducts.slice(0, 4).map((product) => (
                            <ProductCard
                                key={product._id}
                                {...product}
                                onCartClick={() => handleAddToCart(product._id, product.name)}
                                onWishlistClick={null}
                            />
                        ))
                    ) : (
                        products.map((product) => (
                            <ProductCard
                                key={product.id}
                                {...product}
                                onCartClick={() => console.log('Added to cart:', product.name)}
                                onWishlistClick={null}
                            />
                        ))
                    )}
                </div>
                <div className="md:hidden">
                    <Swiper
                        spaceBetween={15}
                        slidesPerView={1}
                        navigation={true}
                        modules={[Navigation]}
                        className="product-slider "
                    >
                        {(allProducts.length > 0 ? allProducts.slice(0, 4) : products).map((product) => (
                            <SwiperSlide key={product._id || product.id}>
                                <ProductCard
                                    {...product}
                                    onCartClick={() => handleAddToCart(product._id || product.id, product.name)}
                                    onWishlistClick={null}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Top Collection Section */}
            <section className='mt-10 p-4 '>
                <SectionHeader
                    title="Top Collections"
                    linkText="View All collection"
                     onClick={()=>navigate(paths.collections)}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {banners.map((banner, index) => (
                        <CategoryBanner key={index} {...banner} />
                    ))}
                </div>
            </section>


            {/* Trusted By Leading Brands */}

            <section className='mt-10 p-4'>
                <SectionHeader
                    title="Trusted By Leading Brands"
                    linkText=""
                    linkPath="/brands"
                />
                <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    loop={true}
                    speed={5000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 },
                    }}
                    modules={[Autoplay]}
                    className="brands-slider"
                >
                    {brands.map((brand, index) => (
                        <SwiperSlide key={index}>
                            <Brands {...brand} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Featured Product */}

            <section className='mt-10 p-4 '>

                <SectionHeader
                    title="Featured Product"
                    linkText=""
                    
                >
                    <div className="filters-container">
                        {filters.map((filter) => (
                            <FilterButton
                                key={filter}
                                isActive={activeFilter === filter}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </FilterButton>
                        ))}
                    </div>
                </SectionHeader>
                <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Featured.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                            onCartClick={() => console.log('Added to cart:', product.name)}
                            onWishlistClick={null}
                        />
                    ))}
                </div>
                <div className="md:hidden">
                    <Swiper
                        spaceBetween={15}
                        slidesPerView={1}
                        navigation={true}
                        modules={[Navigation]}
                        className="featured-slider !px-2 !py-4"
                    >
                        {Featured.map((product) => (
                            <SwiperSlide key={product.id}>
                                <ProductCard
                                    {...product}
                                    onCartClick={() => console.log('Added to cart:', product.name)}
                                    onWishlistClick={null}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


            </section>



            {/* offer section */}
            <section className='mt-10'>
                <HeroCard slides={offerSlides} showArrows={false} />
            </section>


            {/* Digital Products Section */}
            <section className='mt-10 bg-[var(--dark-bg)] py-20 px-4'>
                <div className='flex justify-between items-end mb-8'>
                    <div>
                        <h2 className='text-xl lg:text-3xl font-extrabold text-white'>Digital Products</h2>
                        <p className='text-gray-400 mt-2 text-xs lg:text-base'>Instant downloads and digital solutions</p>
                    </div>

                    <SectionHeader
                        title=""
                        linkText="View All Products"
                        linkPath=""
                    />

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {digitalProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                            onCartClick={() => console.log('Added to cart:', product.name)}
                            onWishlistClick={null}
                        />
                    ))}
                </div>
            </section>


            {/* What Our Customers Say */}
            <section className='mt-10 p-4'>
                <SectionHeader
                    title="What Our Customers Say"
                    linkText=""
                />

                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    modules={[Pagination, Autoplay]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    className="testimonial-slider"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <TestimonialCard {...testimonial} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>


            {/* Latest from Our Blog*/}

            <section className='mt-10 p-4'>
                <SectionHeader
                    title="Latest from Our Blog"
                    linkText="View All blog"
                    linkPath=""
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {blogPosts.map((post) => (
                        <BlogCard key={post.id} {...post} />
                    ))}
                </div>
            </section>

            <Newsletter />

        </div>
    );
};

export default Home;
