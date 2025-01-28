import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
}

export const userSlice = createSlice({
    name:'userAuth',
    initialState,
    reducers:{},
    extraReducers:()=>{}
})

export const UserReducer = userSlice.reducer;