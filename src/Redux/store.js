import { configureStore } from "@reduxjs/toolkit";

import orderReducer from './slices/orders';
import categoriesReducer from './slices/categories';
import productReducer from './slices/products';



const store = configureStore({
    reducer: {

        order: orderReducer,
        categories: categoriesReducer,
        products: productReducer,

    },
    devTools: true
});

export default store;