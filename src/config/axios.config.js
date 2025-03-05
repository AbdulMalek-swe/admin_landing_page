import axios from "axios";
import { getToken } from "../utils/helper";

//const process.env.REACT_APP_API_ENDPOINT = "https://jobmedia-t8mk.onrender.com/api/v1";
 
//const process.env.REACT_APP_API_ENDPOINT = "https://jobmedia-sanbox.azurewebsites.net/api";
/* Publica/Common request config */
// axios.defaults.headers.post["Content-Type"] = "application/json";
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

const publicRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

const privateRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});  
/* Public request config */
publicRequest.interceptors.request.use(
    async (config) => {
        if (config.headers === undefined) {
            config.headers = {};
        }
        return config;
    },
    (err) => {
      
        Promise.reject(err);
    }
);

/* Private request config */
// privateRequest.interceptors.request.use(
//     async (config) => {
//         const token = getToken();
//         if (config.headers === undefined) {
//             config.headers = {};
//         }
//         if (token) {
           
//             config.headers["Authorization"] = "Bearer " + token || "";
//         }
//         return config;
//     },
//     (err) => {
 
//         Promise.reject(err);
//     }
// );
privateRequest.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if (config.headers === undefined) {
            config.headers = {};
        }
        if (token) {
            //config.headers["content-type"] = 'multipart/form-data';
            config.headers["Authorization"] = "Bearer " + token || "";
        }
        return config;
    },
    (err) => {
       
        Promise.reject(err);
    }
);

export { publicRequest, privateRequest };