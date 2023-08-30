import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { URLs } from "../../services/base_urls/constant";
import { toast } from "react-toastify";
import ProductDataService from '../../services/product.service'

const initialState = {
    currentProduct: {},
    products: [],
    adminProducts: [],
    // productsByCategory: [],
    isLoading: false,
    isError: false
};
const productsUrl = URLs.products;

//async reducers
export const createProduct = createAsyncThunk(
    `${productsUrl}/createProduct`,
    async (data) => {
        const res = await ProductDataService.createProduct(data);
        return res.data;
    }
);
export const updateProduct = createAsyncThunk(
    `${productsUrl}/updateProduct/`,
    async (data) => {
        console.log("id , data", data)
        // var { productId } = data.product;
        var product = data.product;
        const res = await ProductDataService.updateProduct(product.productId, product);
        return res.data;
    }
);
export const deleteProduct = createAsyncThunk(
    `${productsUrl}/deleteProduct/`,
    async ({ id }) => {
        const res = await ProductDataService.deleteProduct(id);
        return res.data;
    }
);

export const getAllProducts = createAsyncThunk(
    `${productsUrl}/getAllProducts/`,
    async () => {
        const res = await ProductDataService.getAllProducts();
        console.log("response", res);
        return res.data;
    }
);
export const getAllProductsByCategory = createAsyncThunk(
    `${productsUrl}/getAllProducts/{id}`,
    async ({ categoryId }) => {
        const res = await ProductDataService.getAllProductsByCategory(categoryId);
        console.log("response", res);
        return res.data;
    }
);

export const getProduct = createAsyncThunk(
    `${productsUrl}/`,
    async ({ productId }) => {
        const res = await ProductDataService.getProduct(productId);
        console.log("response", res);
        return res.data;
    }
);


//Product Slice
const productSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        //create Product extra reducers
        builder.addCase(createProduct.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            console.log(state, action);
            const Product = action.payload;
            let newState = {
                ...state,
                isLoading: false,
                isError: false,
                products: [
                    ...state.products,
                    Product,
                ]

            }
            toast.success("Product Created",);
            return newState;
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                isLoading: false,
                isError: true,
            }
            return newState;
        })

        //get product by id
        builder.addCase(getProduct.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: false,
                isError: false,
                currentProduct: {
                    ...action.payload
                }

            }

            console.log(newState);
            return newState;
        })
        builder.addCase(getProduct.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: false,
                isError: true,

            }
            return newState;
        })


        //get all products
        builder.addCase(getAllProducts.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })

        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: false,
                isError: false,
                products: [
                    ...action.payload
                ]

            }
            // console.log(newState);
            return newState;
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: false,
                isError: true,

            }
            return newState;
        })
        //get all products by category
        builder.addCase(getAllProductsByCategory.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })
        builder.addCase(getAllProductsByCategory.fulfilled, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: false,
                isError: false,
                productsByCategory: [
                    ...action.payload
                ]


            }
            return newState;
        })
        builder.addCase(getAllProductsByCategory.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: false,
                isError: true,

            }
            return newState;
        })

        //update Product
        builder.addCase(updateProduct.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }


            return newState;
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {




            const index = state.productsByCategory?.findIndex(Product => Product.productId === action.payload.productId);
            console.log("state products", state.productsByCategory.length)
            console.log(action.payload, index)
            var updatedArray = [...state.productsByCategory];
            updatedArray[index] = {
                ...updatedArray[index],
                ...action.payload
            }

            const newState = {
                ...state,
                isLoading: false,
                isError: false,
                productsByCategory: updatedArray
            }
            toast.success("Product Updated",);
            return newState;
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: false,
                isError: true,
            }
            return newState;
        })

        //delete Product
        builder.addCase(deleteProduct.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            console.log(state, action);
            var filterProducts = state.products.filter((pro) => pro.productId !== action.payload)
            var newState = {
                ...state,
                isLoading: false,
                isError: false,
                products: filterProducts

            }

            console.log("New State after deleting", newState);

            return newState;
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: false,
                isError: true,

            }
            return newState;
        })
    }

})


export const getProducts = (state) => state.products.products;
export const getProductsByCategory = (state) => state.products.productsByCategory;
export const getProductsById = (state) => state.products?.currentProduct;
export const getProductsLoading = (state) => state.products.isLoading;
export const getProductsError = (state) => state.products.isError;


export default productSlice.reducer;;