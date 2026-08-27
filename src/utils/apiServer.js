import { cookies } from "next/headers";
import { client } from "./helper";

export const getProfile = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("jwt")?.value;

        if (!token) {
            return {
                success: false,
                data: null,
                message: "Unauthorized",
            };
        }

        const response = await client.get("user/profile", {
            headers: {
                Authorization: token,
            },
        });

        return {
            success: response.data.success,
            data: response.data.user,
            message: response.data.message,
        };

    } catch (error) {
        console.log(
            "GET PROFILE ERROR:",
            error.response?.data || error.message
        );

        return {
            success: false,
            data: null,
            message: error.response?.data?.message || "Internal Server Error",
        };
    }
};