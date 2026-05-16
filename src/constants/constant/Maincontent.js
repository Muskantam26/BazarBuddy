import appLogo from "../../assets/applogo-greentic.png";
// import appLogoClr from "../../assets/applogo-greentic.png";
import appFavicon from "../../assets/footerlogo.png";
import appFooterLogo from "../../assets/footerlogo.png";
import axios from "axios";
import store from "../../redux/store";
import authStorage from "../../utils/authStorage";


export const MainContent = {
  appName: "BazarBuddy",
  appFullName: "BazarBuddy",
  appLogo: appLogo,
//   appLogoClr: appFooterLogo,
  appFavicon: appFavicon,
  appFooterLogo:appFooterLogo,
//   appURL: "https://www.defi.vin",
  contactNo: "+91 1234567890",
  email: "mskntmrkr@gmail.com",
  address: "India",
  appDescription: "",
  languages: [
    { name: "English", value: "English" },
    { name: "Hindi", value: "Hindi" },
    { name: "Spanish", value: "spanish" },
    { name: "French", value: "french" },
    { name: "Arabic", value: "arabic" },
  ],
};

export const backendConfig = {
//   base:'http://192.168.1.5:5050/api',
//   origin:'http://192.168.1.5:5050',

  base: '', // Removed .env dependency
  origin: '', // Removed .env dependency
};
//  console.log(backendConfig);


export const Axios = axios.create({
  baseURL: backendConfig.base,
  withCredentials: true,
});
Axios.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { appLogo };
