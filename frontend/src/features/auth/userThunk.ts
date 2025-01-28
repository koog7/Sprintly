import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axios/axios.ts";

export const loginUser = createAsyncThunk('user/login', async ({ username, password }: { username: string; password: string }) => {
    const response = await axiosApi.post('/auth', { username, password })
    return response.data
})