import veg from "../assets/veg.png"
import snc from "../assets/snc.png"
import gro from "../assets/gro.png"
import frt from "../assets/fruits.png"
import bvg from "../assets/bev.png"
import eggs from "../assets/egg.png"
import dri from "../assets/dairy.png"
import sea from "../assets/sea.png"

import onionImg from "../assets/onion.png";
import tomatoImg from "../assets/tomato.png";
import potatoImg from "../assets/potato.png";
import juiceImg from "../assets/swing.png";

import klass from "../assets/klass.png"
import makka from "../assets/makka.png"
import mango from "../assets/mango.png"
import freshegg from "../assets/freshegg.png"

export const categories = [
    { id: 1, name: "Vegetables", image: veg, path: "/category/vegetables" },
    { id: 2, name: "Snacks", image: snc, path: "/category/snacks" },
    { id: 3, name: "Groceries", image: gro, path: "/category/groceries" },
    { id: 4, name: "Fruits", image: frt, path: "/category/fruits" },
    { id: 5, name: "Beverages", image: bvg, path: "/category/beverages" },
    { id: 6, name: "Eggs", image: eggs, path: "/category/eggs" },
    { id: 7, name: "Dairy", image: dri, path: "/category/dairy" },
    { id: 8, name: "Seafood", image: sea, path: "/category/seafood" },
];

export const products = [
    {
        _id: "1",
        id: "1",
        image: onionImg,
        tag: "Organic",
        name: "Fresh Onion",
        description: "Fresh onions are a fundamental ingredient in global cuisines, prized for their distinctive flavor and aroma.",
        price: 152.0,
        oldPrice: 190.0,
        category: "Vegetables",
        brand: "EcoGro Partners"
    },
    {
        _id: "2",
        id: "2",
        image: tomatoImg,
        tag: "Healthy",
        name: "Fresh Tomato",
        description: "Fresh tomatoes are versatile fruits widely used in culinary applications across the globe.",
        price: 256.0,
        oldPrice: 320.0,
        category: "Vegetables",
        brand: "GoodCart Co"
    },
    {
        _id: "3",
        id: "3",
        image: potatoImg,
        tag: "Natural",
        name: "Fresh Potato",
        description: "Fresh potatoes (Solanum tuberosum) are staple tuber vegetables cultivated globally.",
        price: 120.0,
        oldPrice: 150.0,
        category: "Vegetables",
        brand: "Farmlio Foods"
    },
    {
        _id: "4",
        id: "4",
        image: juiceImg,
        tag: "Natural",
        name: "Mango Fruit Juice",
        description: "Refreshing mango-flavored beverage packaged in a convenient bottle for on-the-go enjoyment.",
        price: 72.0,
        oldPrice: 90.0,
        category: "Beverages",
        brand: "DailyDrop Supplies"
    },
    {
        _id: "5",
        id: "5",
        image: klass,
        tag: "Natural",
        name: "Klaas River Salmon Fillets 500 g",
        description: "Klaas River Salmon (Indian Basa) Fillets are frozen fish fillets known for mild flavor and tender texture.",
        price: 1500.0,
        oldPrice: 1580.0,
        category: "Seafood",
        brand: "HarvestMate"
    },
    {
        _id: "6",
        id: "6",
        image: makka,
        tag: "Healthy",
        name: "Makka Popcorn, Jumbo Mushroom Corn Kernels",
        description: "Premium-quality, unpopped popcorn kernels known for their large, round mushroom shape.",
        price: 256.0,
        oldPrice: 320.0,
        category: "Snacks",
        brand: "GoodCart Co"
    },
    {
        _id: "7",
        id: "7",
        image: mango,
        tag: "Natural",
        name: "Fresh Mango, Alphonso Ratnagiri",
        description: "Fresh Organic Pomegranates are cultivated without the use of synthetic pesticides or fertilizers.",
        price: 450.0,
        oldPrice: 500.0,
        category: "Fruits",
        brand: "FreshNest"
    },
    {
        _id: "8",
        id: "8",
        image: freshegg,
        tag: "Organic",
        name: "Fresh Eggs, Packs",
        description: "Fresh eggs are a staple in many households, valued for their versatility and nutritional benefits.",
        price: 500.0,
        oldPrice: 540.0,
        category: "Eggs",
        brand: "GreenBasket Co"
    }
];

export const brands = [
    "GoodCart Co", "EcoGro Partners", "Farmlio Foods", 
    "DailyDrop Supplies", "HarvestMate", "GreenBasket Co", "FreshNest"
];
