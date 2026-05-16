import { useDispatch, useSelector } from "react-redux";
import Navigation from "./navigations/Navigation";
import { useEffect } from "react";
import { MainContent } from "./constants/constant/Maincontent";
import PageLoader from "./pageloader/pageloader";
import { Toaster } from "react-hot-toast";

import { setUser, logout } from "./redux/slices/authSlice";
import authStorage from "./utils/authStorage";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);

  useEffect(() => {
    const fetchUser = async () => {
      // API call removed for backend-less mode
      const token = authStorage.getToken();
      if (token) {
        // Mock user data if token exists
        dispatch(setUser({ name: "Mock User", email: "user@example.com" }));
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