import { Axios } from "../constants/constant/Maincontent";

export const getAllProductsById = async(_id)=>{
    try {
        console.log(Axios.baseURL);
        const response = await Axios.get(`/products/detail/${_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}