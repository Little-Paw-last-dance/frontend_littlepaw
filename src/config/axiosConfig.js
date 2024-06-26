import axios from "axios";

export const backendAPI = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

