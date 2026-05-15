import { useDispatch, useSelector } from "react-redux";
import Navigation from "./navigations/Navigation";
import { useEffect } from "react";
import { MainContent } from "./constants/constant/Maincontent";
import PageLoader from "./pageloader/pageloader";
import { Toaster } from "react-hot-toast";
import { getUserProfile } from "./api/User-api";
import { setUser, logout } from "./redux/slices/authSlice";
import authStorage from "./utils/authStorage";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);

  useEffect(() => {
    const fetchUser = async () => {
      const token = authStorage.getToken();
      if (token) {
        try {
          console.log("Fetching user profile with token:", token);
          const res = await getUserProfile();
          console.log("Profile fetch response:", res);
          
          if (res.success || res.status === 'success' || res.user || res.data?.user || res.data?.id) {
            const userData = res.data?.user || res.user || (res.data && typeof res.data === 'object' ? res.data : res);
            console.log("Setting user data:", userData);
            dispatch(setUser(userData));
          } else {
            console.warn("Profile fetch succeeded but success flag was false:", res);
            authStorage.removeToken();
            dispatch(logout());
          }
        } catch (err) {
          console.error("Profile fetch error detail:", err?.response?.data || err.message);
          
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            authStorage.removeToken();
            dispatch(logout());
          }
        }
      }
    };
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    // Dynamic Title
    document.title = MainContent.appFullName || MainContent.appName;
    
    // Dynamic Favicon
    let faviconLink =
      document.querySelector('link[rel="icon"]') ||
      document.createElement("link");
    faviconLink.rel = "icon";
    faviconLink.href = MainContent.appFavicon;
    if (!document.querySelector('link[rel="icon"]')) {
      document.head.appendChild(faviconLink);
    }
  }, []);

  return (
    <>
        {isLoading && <PageLoader />}
        <Toaster position="top-center" reverseOrder={false} />
        <Navigation />
    </>
  );
}

export default App;