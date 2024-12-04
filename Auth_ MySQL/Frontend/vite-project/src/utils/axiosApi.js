// import axios from 'axios';
// export const axiosApi = axios.create({
//     baseURL: 'http://localhost:5000',
//     withCredentials: true
// });

// // const axiosApi = axios.create({
// //   baseURL: 'http://localhost:5000',
 
// // });


// // axiosApi.interceptors.request.use(
// //     (request) => {
// //         const accessToken = getItem(KEY_ACCESS_TOKEN);
// //         console.log("request access token is ", accessToken);
// //         request.headers['Authorization'] = `Bearer ${accessToken}`;
// //         return request;
// //     }
// // )
// // Interceptor for refreshing token
// axiosApi.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (error.response.status === 401) {
//         const refreshResponse = await axios.post('http://localhost:5000/auth/refresh-token', {}, { withCredentials: true });
//         localStorage.setItem('accessToken', refreshResponse.data.accesstoken);
//         error.config.headers['Authorization'] = `Bearer ${refreshResponse.data.accesstoken}`;
//         return axios(error.config);
//       }
//       return Promise.reject(error);
//     }
//   );
//   export default axiosApi;
import axios from 'axios';

export const axiosApi = axios.create({
    baseURL: 'http://localhost:5000',  // Your API base URL
    withCredentials: true,            // Ensure credentials are included (e.g., cookies)
});

// Interceptor to handle 401 responses and refresh the token
axiosApi.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            // Handle token refresh logic here
            const refreshResponse = await axios.post('http://localhost:5000/auth/refresh-token', {}, { withCredentials: true });
            localStorage.setItem('accessToken', refreshResponse.data.accesstoken);
            error.config.headers['Authorization'] = `Bearer ${refreshResponse.data.accesstoken}`;
            return axios(error.config);  // Retry the failed request with the new token
        }
        return Promise.reject(error);
    }
);

export default axiosApi;
