import {createSlice} from "@reduxjs/toolkit";
import {authUser, loginUser, logoutUser} from "./userThunk.ts";

interface UserData {
    username: string;
    token: string;
}

interface UserState {
    user: UserData | null;
    loader: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loader: false,
    error: null,
}

export const userSlice = createSlice({
    name:'userAuth',
    initialState,
    reducers:{
        clearData : (state: UserState) => {
            state.user = null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending , (state: UserState) => {
            state.loader = true;
            state.error = null
        }).addCase(loginUser.fulfilled , (state: UserState, action) => {
            state.user = action.payload;
            state.loader = false;
            state.error = null;
        }).addCase(loginUser.rejected , (state: UserState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        })

        builder.addCase(authUser.pending , (state: UserState) => {
            state.loader = true;
            state.error = null
        }).addCase(authUser.fulfilled , (state: UserState, action) => {
            state.user = action.payload;
            state.loader = false;
            state.error = null;
        }).addCase(authUser.rejected , (state: UserState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        })

        builder.addCase(logoutUser.pending , (state: UserState) => {
            state.loader = true;
            state.error = null
        }).addCase(logoutUser.fulfilled , (state: UserState) => {
            state.loader = false;
            state.error = null
        }).addCase(logoutUser.rejected , (state: UserState, action) => {
            state.loader = true;
            state.error = action.payload as string;
        })
    },

})

export const selectUser = (state: { User: UserState }) => state.User.user;

export const UserReducer = userSlice.reducer;
export const {clearData} = userSlice.actions;