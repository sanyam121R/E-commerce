import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { order_api } from "../api";

const initialState = {
    orderedProducts: [],
    ordersLoaded: false,
    status: "",
    error: ""
}

export const getOrders = createAsyncThunk(
    "orders/get",
    async (items, {rejectWithValue}) => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(`${order_api}/get-orders`, 
        items, {
            headers: {
                authorization: `${accessToken}`,
            }
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
    // getOrders
            .addCase(getOrders.pending, (state, action)=>{
                return {
                    ...state,
                    status: 'loading'
                }
            })
            .addCase(getOrders.fulfilled, (state, action)=>{
                state.status = "succeded";
                state.orderedProducts = action.payload;
                state.ordersLoaded = true;
            })
            .addCase(getOrders.rejected, (state, action)=>{
                return {
                    ...state,
                    status: 'loading',
                    ordersLoaded: false,
                    error: action.error.message
                }
            });
    }
});

export default orderSlice.reducer;
