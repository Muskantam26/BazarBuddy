import { Axios } from "../constants/constant/Maincontent";

export const getAllProducts = async()=>{
    try {
        console.log(Axios.baseURL);
        const response = await Axios.get(`/products/list`);
        return response.data;
    } catch (error) {
        throw error;
    }
}