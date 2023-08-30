import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URLs } from "../../services/base_urls/constant";

import OrderDataService from '../../services/order.service';
import { toast } from "react-toastify";
import { act } from "react-dom/test-utils";



const initialState = {

    orders: [],
    isLoading: false,
    isError: false,

};
const orderUrl = URLs.order;





export const getAllOrdersHandler = createAsyncThunk(
    `${orderUrl}/allOrders`,
    async () => {

        const res = await OrderDataService.getAllOrders();
        console.log("all orders", res);
        // alert("updated in database");
        return res.data;
    }
);
export const shippingOrdersHandler = createAsyncThunk(
    `${orderUrl}/shipped`,
    async (orderId) => {

        const res = await OrderDataService.shippedOrder(orderId);
        console.log("shipped", res);
        // alert("updated in database");
        return res.data;
    }
);
export const deliveredOrdersHandler = createAsyncThunk(
    `${orderUrl}/delivered`,
    async (orderId) => {

        const res = await OrderDataService.deliveredOrder(orderId);
        console.log("delivered", res);
        // alert("updated in database");
        return res.data;
    }
);
export const cancelOrdersHandler = createAsyncThunk(
    `${orderUrl}/cancelled`,
    async (orderId) => {

        const res = await OrderDataService.cancelOrder(orderId);
        console.log("cancelled", res);
        // alert("updated in database");
        return res.data;
    }
);

const orderSlice = createSlice({
    initialState: initialState,
    name: 'order',
    reducers: {

    },
    extraReducers: (builder) => {

        //create order
        builder.addCase(shippingOrdersHandler.pending, (state, action) => {


            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            console.log(newState);
            return newState;

        })

        builder.addCase(shippingOrdersHandler.fulfilled, (state, action) => {
            var orders = state.orders;
            var updatedOrders = orders.filter((item) => item.id !== action.payload.id);
            updatedOrders = [...updatedOrders, action.payload];
            console.log(action);
            let newState = {
                ...state,
                isLoading: false,
                isError: false,
                orders: updatedOrders
            }
            toast.success("Status updated",);
            return newState;

        })

        builder.addCase(shippingOrdersHandler.rejected, (state, action) => {
            let newState = {
                ...state,
                isLoading: false,
                isError: true
            }
            return newState;
        })

        //get order
        builder.addCase(deliveredOrdersHandler.pending, (state, action) => {
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })

        builder.addCase(deliveredOrdersHandler.fulfilled, (state, action) => {
            var orders = state.orders;
            var updatedOrders = orders.filter((item) => item.id !== action.payload.id);
            updatedOrders = [...updatedOrders, action.payload];
            console.log(action);
            let newState = {
                ...state,
                isLoading: false,
                isError: false,
                orders: updatedOrders
            }
            toast.success("Status updated",);
            return newState;
        })

        builder.addCase(deliveredOrdersHandler.rejected, (state, action) => {
            console.log(action);

            let newState = {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload
            }
            toast.success("Status updated",);

            return newState;
        })
        builder.addCase(cancelOrdersHandler.pending, (state, action) => {
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })

        builder.addCase(cancelOrdersHandler.fulfilled, (state, action) => {
            var orders = state.orders;
            var updatedOrders = orders.filter((item) => item.id !== action.payload.id);
            updatedOrders = [...updatedOrders, action.payload];
            console.log(action);
            let newState = {
                ...state,
                isLoading: false,
                isError: false,
                orders: updatedOrders
            }
            toast.success("Status updated",);
            return newState;
        })

        builder.addCase(cancelOrdersHandler.rejected, (state, action) => {
            console.log(action);

            let newState = {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload
            }
            return newState;
        })

        //get user orders
        builder.addCase(getAllOrdersHandler.pending, (state, action) => {
            let newState = {
                ...state,
                orders: [],
                isLoading: true,
                isError: false
            }
            return newState;
        })

        builder.addCase(getAllOrdersHandler.fulfilled, (state, action) => {
            console.log(action);
            let newState = {
                ...state,
                orders: [...action.payload],
                isLoading: false,
                isError: false
            }
            return newState;
        })

        builder.addCase(getAllOrdersHandler.rejected, (state, action) => {
            console.log(action);
            let newState = {
                ...state,
                orders: [],
                isLoading: false,
                isError: true,
                error: action.payload
            }
            return newState;
        })
    }
});

// export const getCreatedOrder = (state) => state.order.order;
// export const getPlacedOrder = (state) => state.order.placedOrder;
export const getAllOrders = (state) => state.order.orders;
export const getOrderLoading = (state) => state.order.isLoading;
export const getOrderError = (state) => state.order.isError;




export default orderSlice.reducer;;
