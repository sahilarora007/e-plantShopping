import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = { ...action.payload, quantity: 1 };
      const existingItem = state.items.find(item => item.name === newItem.name);
      if (!existingItem) {
        state.items.push(newItem);
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

// Exporting actions
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Exporting reducer
export default cartSlice.reducer;
