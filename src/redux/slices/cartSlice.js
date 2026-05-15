import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCountItems, getCartItems } from '../../api/Cart-api';

export const fetchCartCount = createAsyncThunk(
  'cart/fetchCount',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCountItems();
      if (res.success || res.status === 'success') {
        return res.count ?? res.data?.count ?? (typeof res.data === 'number' ? res.data : 0);
      }
      return 0;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  'cart/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCartItems();
      if (res.success || res.status === 'success') {
        const items = res.items || 
                      res.data?.items || 
                      res.cart?.items || 
                      res.data?.cart?.items || 
                      (Array.isArray(res.data) ? res.data : []);
        return items;
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
      const amount = action.payload || 1;
      state.count += amount;
    },
    setCartCount: (state, action) => {
      state.count = action.payload;
    },
    decrementCount: (state, action) => {
      state.count = Math.max(0, state.count - (action.payload || 1));
    },
    toggleSidebar: (state, action) => {
      state.isSidebarOpen = action.payload !== undefined ? action.payload : !state.isSidebarOpen;
    },
    addItemOptimistically: (state, action) => {
      const productId = action.payload;
      if (!state.items.some(item => (item.productId?._id || item.productId || item.id) === productId)) {
        state.items.push({ productId: productId, quantity: 1 });
        state.count += 1;
      }
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
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
    
        state.count = action.payload.length;
      });
  },
});

export const { incrementCount, setCartCount, decrementCount, toggleSidebar, addItemOptimistically } = cartSlice.actions;
export default cartSlice.reducer;
