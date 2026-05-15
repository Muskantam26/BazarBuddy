import { Axios } from "../constants/constant/Maincontent";

export const getCartItems = async()=>{
    try {
        
        const response = await Axios.get('/cart/get');
        return response.data;
    } catch (error) {
        throw error;
    }
}



export const getCountItems = async()=>{
    try {
        
        const response = await Axios.get('/cart/count');
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const addToCart = async (productId, quantity, attributes = []) => {
    try {
        console.log("Adding to cart:", { productId, quantity, attributes });
        const response = await Axios.post('/cart/add', { productId, quantity, attributes });
        return response.data;
    } catch (error) {
        throw error;
    }
}



export const removeCartItem = async (productId) => {
    try {
        const response = await Axios.delete(`/cart/remove`, {
            data: { productId }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function getCheckoutDetails() {
  const response = await Axios.get('/cart/get-cart-final-data');
  return response?.data;
}
