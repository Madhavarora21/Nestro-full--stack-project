import { client } from "./helper";


export const fetchRooms = async (queryObject = {}) => {
    try {
        const query = new URLSearchParams();

        if (queryObject.status !== undefined && queryObject.status !== "") {
            query.append("status", queryObject.status);
        }

        if (queryObject.limit) {
            query.append("limit", queryObject.limit);
        }

        const response = await client.get(`room-type?${query.toString()}`);

        return {
            success: response.data.success,
            data: response.data.rooms || [],
            message: response.data.message
        };

    } catch (error) {
        console.log(
            "FETCH ROOMS ERROR:",
            error.response?.data || error.message
        );

        return {
            success: false,
            data: [],
            message:
                error.response?.data?.message ||
                "Internal Server Error"
        };
    }
};



export const fetchRoomsById = async (id) => {
    try {
        const response = await client.get(`room-type/${id}`);

        return {
            success: response.data.success,
            data: response.data.room || response.data.rooms,
            message: response.data.message
        };

    } catch (error) {
        console.log(
            "FETCH ROOM BY ID ERROR:",
            error.response?.data || error.message
        );

        return {
            success: false,
            data: null,
            message:
                error.response?.data?.message ||
                "Internal Server Error"
        };
    }
};



export const fetchCategory = async () => {
    try {
        const response = await client.get("category");

        return {
            success: response.data.success,
            data: response.data.categories || [],
            message: response.data.message
        };

    } catch (error) {
        console.log(
            "FETCH CATEGORY ERROR:",
            error.response?.data || error.message
        );

        return {
            success: false,
            data: [],
            message:
                error.response?.data?.message ||
                "Internal Server Error"
        };
    }
};


// Fetch category by ID
export const fetchCategoryById = async (id) => {
    try {
        const response = await client.get(`category/${id}`);

        return {
            success: response.data.success,
            data: response.data.category,
            message: response.data.message
        };

    } catch (error) {
        console.log(
            "FETCH CATEGORY BY ID ERROR:",
            error.response?.data || error.message
        );

        return {
            success: false,
            data: null,
            message:
                error.response?.data?.message ||
                "Internal Server Error"
        };
    }
};



export const fetchProduct = async (queryObject = {}) => {
    try {
        const query = new URLSearchParams();

        if (queryObject.status !== undefined && queryObject.status !== "") {
            query.append("status", queryObject.status);
        }

        if (queryObject.limit) {
            query.append("limit", queryObject.limit);
        }

        if (
            queryObject.bestSeller !== undefined &&
            queryObject.bestSeller !== ""
        ) {
            query.append("bestSeller", queryObject.bestSeller);
        }

        if (
            queryObject.stock !== undefined &&
            queryObject.stock !== ""
        ) {
            query.append("stock", queryObject.stock);
        }

        if (queryObject.newArrival !== undefined && queryObject.newArrival !== "") {
            query.append("newArrival", queryObject.newArrival);
        }

        if (queryObject.featured !== undefined && queryObject.featured !== "") {
            query.append("featured", queryObject.featured);
        }

        if (queryObject.rooms) {
            query.append("rooms", queryObject.rooms);
        }

        if (queryObject.category) {
            query.append("category", queryObject.category);
        }

        if (
            queryObject.min !== undefined &&
            queryObject.max !== undefined &&
            queryObject.min !== "" &&
            queryObject.max !== ""
        ) {
            query.append("min", queryObject.min);
            query.append("max", queryObject.max);
        }

        if (queryObject.sort) {
            query.append("sort", queryObject.sort);
        }

        if (queryObject.skip) {
            query.append("skip", queryObject.skip);
        }

        const response = await client.get(`product?${query.toString()}`);

        return {
            success: response.data.success,
            data: response.data.products || [],
            message: response.data.message,
            meta: response.data.meta
        };

    } catch (error) {
        console.log(
            "FETCH PRODUCT ERROR:",
            error.response?.data || error.message
        );

        return {
            success: false,
            data: [],
            message:
                error.response?.data?.message ||
                "Internal Server Error"
        };
    }
};


// Fetch product by ID
export const fetchProductById = async (id) => {
    try {
        const response = await client.get(`product/${id}`);

        return {
            success: response.data.success,
            data: response.data.product,
            message: response.data.message
        };

    } catch (error) {
        console.log(
            "FETCH PRODUCT BY ID ERROR:",
            error.response?.data || error.message
        );

        return {
            success: false,
            data: null,
            message:
                error.response?.data?.message ||
                "Internal Server Error"
        };
    }
};