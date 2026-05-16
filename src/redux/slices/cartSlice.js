import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// All API calls removed for frontend-only mode.
// Mock data lookups should happen locally.

export const fetchCartCount = createAsyncThunk(
  'cart/fetchCount',
  async (_, { getState }) => {
    const { cart } = getState();
    return cart.items.length; // Count unique items
  }
);

export const fetchCartItems = createAsyncThunk(
  'cart/fetchItems',
  async (_, { getState }) => {
    const { cart } = getState();
    return cart.items;
  }
);

const initialState = {
  count: 0,
  items: [],
  isSidebarOpen: false,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementCount: (state, action) => {
      // This is now redundant since we use state.items.length,
      // but we'll update it to keep logic consistent.
      state.count = state.items.length;
    },
    setCartCount: (state, action) => {
      state.count = action.payload;
    },
    decrementCount: (state, action) => {
      state.count = state.items.length;
    },
    toggleSidebar: (state, action) => {
      state.isSidebarOpen = action.payload !== undefined ? action.payload : !state.isSidebarOpen;
    },
    addItemOptimistically: (state, action) => {
      const productId = action.payload;
      const id = typeof productId === 'object' ? (productId._id || productId.id) : productId;
      
      const existingItem = state.items.find(item => 
        (item.productId?._id || item.productId || item.id) === id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ 
          productId: productId, 
          quantity: 1,
          _id: `cart_${Date.now()}_${Math.random()}`
        });
      }
      state.count = state.items.length; // Number of unique products
    },
    updateQuantity: (state, action) => {
        const { productId, quantity } = action.payload;
        const item = state.items.find(item => 
            (item.productId?._id || item.productId || item.id) === productId
        );
        if (item) {
            item.quantity = quantity;
        }
        state.count = state.items.length; // Number of unique products
    },
    removeItem: (state, action) => {
        const productId = action.payload;
        state.items = state.items.filter(item => 
            (item.productId?._id || item.productId || item.id) !== productId
        );
        state.count = state.items.length; // Number of unique products
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartCount.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload;
      })
      .addCase(fetchCartCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.count = action.payload.length; // Number of unique products
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
    incrementCount, 
    setCartCount, 
    decrementCount, 
    toggleSidebar, 
    addItemOptimistically,
    updateQuantity,
    removeItem
} = cartSlice.actions;
export default cartSlice.reducer;
