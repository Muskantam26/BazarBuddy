import { Axios } from "../constants/constant/Maincontent";


// Order APIs
export async function getMyDashboardOrdersApi({ page = 1, limit = 10, status = ""} = {}) {
  try {
    const response = await Axios.get(`/orders/my-orders`, {
      params: { page, limit, status: status || undefined }
    });
    return response?.data;
  } catch (error) {
    console.error("Get my orders error:", error);
    throw error;
  }
}
export async function placeOrderApi(payload) {
  const response = await Axios.post(`/orders/create`, payload);
  return response?.data;
}