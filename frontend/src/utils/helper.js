import axios from "axios"

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 30000,
    withCredentials: true,
});

client.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = token;
        }
    }
    return config;
});

const generateSlug = (value) => {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
}

export { client, generateSlug }