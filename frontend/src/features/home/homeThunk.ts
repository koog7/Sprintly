import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axios/axios.ts";

export const getProject = createAsyncThunk('home/get', async () => {
    const response = await axiosApi.get('/project/myProjects')
    return response.data;
})