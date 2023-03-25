import { createSlice } from "@reduxjs/toolkit";
const cart = [];
export const cartSlice = createSlice({
    name: "cart",
    initialState:cart,
    reducers: {
        addItem: (state, action) => {
            
            const product = action.payload;
            const exist = state.find((x) => x.id === product.id);
      if (exist) {
          return state.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty:
                  item.qty > 1
                    ? item.qty + product.qty
                    : parseInt(item.unit) + 1,
              }
            : item
        );
      }
      return state=product;
     },

     deleteItem:(state,action)=>{ 
      return state.filter((item) => {
        return item.id !== action.payload;
      });
    },

    increaseQty: (state,action)=>{ const product = action.payload;
      return state.map((item) =>
        item.id === product.id ? { ...item, qty: product.qty + 1 } : item
      );
    },

     decreaseQty: (state,action) =>{ 
      const product = action.payload;
      return state.map((item) =>
        item.id === product.id
          ? { ...item, qty: product.qty > 1 ? product.qty - 1 : product.qty }
          : item
      )}
     
    }
}
);

export const selectCart = (state) => state.cart;
export const {addItem, deleteItem, increaseQty, decreaseQty} = cartSlice.actions;
export default cartSlice.reducer;