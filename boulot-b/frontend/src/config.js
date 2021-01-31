import axios from "axios";
let baseURL;

if (process.env.NODE_ENV === "development") {
    baseURL = "http://localhost:8080/boulot-b/"
} else {
    baseURL = axios.defaults.baseURL
}

const http = axios.create({
    baseURL
})

export { http }