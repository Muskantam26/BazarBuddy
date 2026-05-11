import { Axios } from "../constants/constant/Maincontent";

// Send OTP to email
export const sendOtp = async (data) => {
    try {
        const response = await Axios.post(`/user/auth/send-otp`, data);
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

// Register user
export const registerUser = async (data) => {
    try {
        const response = await Axios.post(`/user/auth/register`, data);
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
        const response = await Axios.get(`/user/auth/profile`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update User Profile
export const updateUserProfile = async (data) => {
    try {
        const response = await Axios.patch(`/user/auth/profile`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Logout User
export const logoutUser = async () => {
    try {
        const response = await Axios.post(`/user/auth/logout`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
