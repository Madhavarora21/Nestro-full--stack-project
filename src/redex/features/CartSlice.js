import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    original_total: 0,
    final_total: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, { payload }) => {
            const existingItem = state.items.find(item => item.id == payload.id);
            if (existingItem) {
                existingItem.qty += 1;
            }
            else {
                state.items.push(payload);
            }
            state.final_total += Number(payload.salePrice);
            state.original_total += Number(payload.originalPrice);

        },
        removeFromCart: (state, { payload }) => {
            state.items = state.items.filter((item) => item.id !== payload.id);

        },
        emptyCart: (state, current) => {
            state.items = [];
            state.final_total = 0;
            state.original_total = 0;
        },
        increaseQuantity: (state, { payload }) => {
            const cartItem = state.items.find((item) => item.id == payload.id);
            if (cartItem) {
                cartItem.qty += 1;
            }
        },
        decreaseQuantity: (state, { payload }) => {
            const cartItem = state.items.find((item) => item.id == payload.id);
            if (!cartItem) return
            if (cartItem > 1) {
                state.items = state.items.filter((item) => item.id !== payload.id);

            } else {
                cartItem.qty -= 1;
            }
        },
        cartTotal: (state, { payload }) => {
            state.final_total = state.items.reduce(
                (sum, item) => sum + item.salePrice * item.qty,
                0
            );
            state.original_total = state.items.reduce(
                (sum, item) => sum + item.originalPrice * item.qty,
                0
            );
        }
    },
})


export const { addToCart, removeFromCart, emptyCart, increaseQuantity, decreaseQuantity
} = cartSlice.actions

export default cartSlice.reducer