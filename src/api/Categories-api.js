import { Axios } from "../constants/constant/Maincontent";


export const getAllCategories = async()=>{
    try {
        console.log(Axios.baseURL);
        const response = await Axios.get(`/categories/list`);
        return response.data;
    } catch (error) {
        throw error;
    }
}