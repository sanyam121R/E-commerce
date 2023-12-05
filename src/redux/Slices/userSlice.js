import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { auth_api } from "../api";
import axios from "axios";

const initialState = {
    user : [],
    userLoaded: false,
    userStatus: ""
}

export const userDetails = createAsyncThunk(
    "user/profile",
    async (values, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.get(
                `${auth_api}/user/details`, {
                    headers: {
                        authorization: token,
                    },
                }
            );
            return response.data.userDetails
        } catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUserDetails(state, action){
            localStorage.clear();
            return {
                user : [],
                userLoaded: false,
                userStatus: ""   
            }
        },
        getUser(state, action){
            const token = localStorage.getItem('accessToken');
            if (token) {
                return {
                    ...state,
                    userLoaded: true,
                    user: action.payload
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userDetails.fulfilled, (state, action)=>{
            return {...state,
                user: action.payload,
                userLoaded: true,
                userStatus: "success"
            }
        });
        builder.addCase(userDetails.pending, (state, action)=>{
            return {...state, userStatus:"pending"}
        });
        builder.addCase(userDetails.rejected, (state, action)=>{
            return{
                ...state, userStatus: "rejected"
            }
        });
    }
})

export const {
    logoutUserDetails,
    getUser
} = userSlice.actions

export default userSlice.reducer;