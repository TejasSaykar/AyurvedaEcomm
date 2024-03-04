import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: []
}

export const productSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = state.products.find(product => product._id === action.payload._id);
            if (product) {
                product.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(prod => prod._id !== action.payload._id)
        },
        addFromCart: (state, action) => {
            const product = state.products.find(prod => prod._id === action.payload._id);
            if (product) {
                product.quantity += action.payload.quantity
            }
        },
        emptyCart: (state) => {
            return initialState;
        },
    }
});

export const { addToCart, removeProduct, emptyCart, toggleShowCart, addFromCart } = productSlice.actions;
export default productSlice.reducer;