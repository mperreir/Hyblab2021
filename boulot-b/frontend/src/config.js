import axios from "axios";
let baseURL;

if (process.env.NODE_ENV === "development") {
    baseURL = "http://localhost:8080/"
} else {
    baseURL = axios.defaults.baseURL
}

const http = axios.create({
    baseURL
})

export { http }