import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of items: { name, image, cost, description, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost, description } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          name,
          image,
          cost,
          description,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      // Handles both passing name directly or passing { name } object
      const nameToRemove = typeof action.payload === 'string' 
        ? action.payload 
        : action.payload?.name;
      state.items = state.items.filter((item) => item.name !== nameToRemove);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        if (quantity > 0) {
          itemToUpdate.quantity = quantity;
        } else {
          // If quantity reaches 0, remove item from cart
          state.items = state.items.filter((item) => item.name !== name);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
