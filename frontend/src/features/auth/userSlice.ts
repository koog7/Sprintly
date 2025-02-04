import {createSlice} from "@reduxjs/toolkit";
import {authUser, loginUser} from "./userThunk.ts";

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
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending , (state: UserState) => {
            state.loader = true;
            state.error = null
        })
        builder.addCase(loginUser.fulfilled , (state: UserState, action) => {
            state.user = action.payload;
            state.loader = false;
            state.error = null;
        })
        builder.addCase(loginUser.rejected , (state: UserState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        })

        builder.addCase(authUser.pending , (state: UserState) => {
            state.loader = true;
            state.error = null
        })
        builder.addCase(authUser.fulfilled , (state: UserState, action) => {
            state.user = action.payload;
            state.loader = false;
            state.error = null;
        })
        builder.addCase(authUser.rejected , (state: UserState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        })
    },

})

export const selectUser = (state: { User: UserState }) => state.User.user;

export const UserReducer = userSlice.reducer;