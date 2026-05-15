import { Axios } from "../constants/constant/Maincontent";


export const getAllCategories = async()=>{
    try {
        console.log(Axios.baseURL);
        const response = await Axios.get(`/categories/active`);
        return response.data;
    } catch (error) {
        throw error;
    }
}