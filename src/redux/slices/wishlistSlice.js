import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const loadWishlistFromStorage = () => {
  try {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error('Error loading wishlist from localStorage:', error);
    return [];
  }
};

const saveWishlistToStorage = (items) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
  }
};

const initialState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item._id === product._id);
      if (!exists) {
        state.items.push(product);
        saveWishlistToStorage(state.items);
        toast.success(`${product.name} added to wishlist!`);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      const product = state.items.find((item) => item._id === productId);
      state.items = state.items.filter((item) => item._id !== productId);
      saveWishlistToStorage(state.items);
      if (product) {
        toast.success(`${product.name} removed from wishlist!`);
      }
    },
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item._id === product._id);
      if (exists) {
        state.items = state.items.filter((item) => item._id !== product._id);
        toast.success(`${product.name} removed from wishlist!`);
      } else {
        state.items.push(product);
        toast.success(`${product.name} added to wishlist!`);
      }
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
