import axios from "axios";

export const axiosInstance=axios.create({
baseURL:"http://localhost:5002/api",
withCredentials:true,//this is for send cookie for every single request if cookie present in that api code,
});