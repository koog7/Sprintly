// const axiosApi = axios.create({
//     baseURL: 'http://localhost:8000'
// });
//
// export const addInterceptors = (store: Store<RootState>) => {
//     axiosApi.interceptors.request.use((config) => {
//         const token = store.getState().User.user?.token;
//
//         const headers = config.headers as AxiosHeaders;
//
//         if (token) {
//             headers.set('Authorization', `Bearer ${token}`);
//         }
//
//         return config;
//     });
// };

import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'http://localhost:8000'
});

export default axiosApi;