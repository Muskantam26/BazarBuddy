import { Axios } from "../constants/constant/Maincontent";




// Register user
export const registerUser = async (data) => {
    try {
        const response = await Axios.post(`/user/auth/create-user`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Verify OTP
export const verifyOtp = async (data) => {
    try {
        const response = await Axios.post(`/user/auth/verify-otp`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Login user
export const loginUser = async (data) => {
    try {
        const response = await Axios.post(`/user/auth/login`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get User Profile
export const getUserProfile = async () => {
    try {
        const response = await Axios.get(`/user/get-profile`);
        return response.data;
    } catch (error) {
        throw error;
    }
};










