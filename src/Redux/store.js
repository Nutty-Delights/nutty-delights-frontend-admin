import { configureStore } from "@reduxjs/toolkit";

import orderReducer from './slices/orders';



const store = configureStore({
    reducer: {

        order: orderReducer,


    },
    devTools: true
});

export default store;