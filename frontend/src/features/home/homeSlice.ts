import {createSlice} from "@reduxjs/toolkit";
import {getProject} from "./homeThunk.ts";
import {RootState} from "../../app/store.ts";

export interface HomeData{
    _id: string;
    username: string;
    activeGroups: [{
        _id: string;
        name: string;
        description: string;
        availablePlace: number;
        inviteCode: string;
    }],
}

interface HomeState {
    projects: HomeData | null;
    loader: boolean;
    error: string | null;
}

const initialState: HomeState = {
    projects: null,
    loader: false,
    error: null,
}

export const homeSlice = createSlice({
    name: 'home-page',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getProject.pending , (state: HomeState) => {
            state.loader = true;
            state.error = null
        })
        builder.addCase(getProject.fulfilled , (state: HomeState, action) => {
            state.projects = action.payload;
            state.loader = false;
            state.error = null
        })
        builder.addCase(getProject.rejected , (state: HomeState, action) => {
            state.loader = true;
            state.error = action.payload as string;
        })
    },
})
export const selectProjects = (state: RootState) => state.Home.projects;
export const HomeReducer = homeSlice.reducer;