import axios from "axios";

export default axios.create({
    // baseURL: "http://192.168.29.230:8081",
    baseURL: "https://nutty-delights.onrender.com/",
    headers: {
        "Content-type": "application/json"
    }
});