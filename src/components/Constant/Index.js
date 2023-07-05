import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT });
const API1 = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT });
console.log(process.env.REACT_APP_API_ENDPOINT)

// axios request header interceptors 
API.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    req.headers.common = { "Access-Control-Allow-Origin": "*" }
    return req;
});  

//entity voter list 
const getEntity = () => API.get("list/entity");

//deshboard data list
const getReport = () => API1.get("Report/Dashboard");


// eslint-disable-next-line 
export default {
    getEntity,
    getReport
}