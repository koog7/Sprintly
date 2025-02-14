import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axios/axios.ts";
import axios from "axios";

export const getProject = createAsyncThunk('home/get', async () => {
    const response = await axiosApi.get('/project/myProjects')
    return response.data;
})


export const joinProject = createAsyncThunk('home/join' , async (code: string, { rejectWithValue }) => {
    try{
        const response = await axiosApi.post(`/project/accept-invite/${code}`)
        return response.data;
    }catch(error){
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
    }
})