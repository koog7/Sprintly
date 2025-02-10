import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axios/axios.ts";

export const loginUser = createAsyncThunk('user/login', async ({ username, password }: { username: string; password: string }) => {
    const response = await axiosApi.post('/auth', { username, password })
    return response.data
})

export const authUser = createAsyncThunk('user/auth', async ({ username, password }: { username: string; password: string }) => {
    const response = await axiosApi.post('/auth/sessions', { username, password })
    return response.data
})

export const logoutUser = createAsyncThunk('user/logout' , async () => {
     await axiosApi.delete('/auth/sessions')
})