import { Axios } from "../constants/constant/Maincontent";


export async function addUserAddressApi(payload) {
  const response = await Axios.post(`/address/add`, payload);
  return response?.data;
}
export async function getUserAddressApi() {
  const response = await Axios.get(`/address/get`);
  return response?.data;
}