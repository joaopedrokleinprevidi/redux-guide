import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart", //nome do reducer
  initialState, //estado inicial
  reducers: {
    // aqui dentro ficam as actions, que são os eventos que podem alterar nossa reducer
    addProduct: (state, action) => {
      // verificar se o produto já está no carrinho
      const productIsAlredyInCart = state.products.some(
        (product) => product.id === action.payload.id
      );

      // se ele estiver, aumentar sua quantidade em 1
      if (productIsAlredyInCart) {
        state.products = state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
        return;
      }

      // se ele não estiver, adicioná-lo
      state.products = [...state.products, { ...action.payload, quantity: 1 }];
    },
    increaseProductQuantity: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    },
    decreaseProductQuantity: (state, action) => {
      state.products = state.products
        .map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id === action.payload
      );
    },
  },
});

export const {
  addProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
