import axios, { AxiosRequestHeaders } from 'axios'
import queryString from 'query-string'
const baseURL = "https://be-phone-eu7f.onrender.com/"

const publicClient = axios.create({
    baseURL,
    paramsSerializer:{
        encode:params => queryString.stringify(params)
    }
})
publicClient.interceptors.request.use(async config => {
    return {
        ...config,
        headers:{
            "Content-Type": "application/json",

        }as AxiosRequestHeaders
    }
})
publicClient.interceptors.response.use((response) => {
    if (response && response.data) return response;
    return response;
  }, (err) => {
    throw err.response;
  });
  export default publicClient;