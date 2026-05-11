import { useSelector } from "react-redux";
import Navigation from "./navigations/Navigation";
import { useEffect } from "react";
import { MainContent } from "./constants/constant/Maincontent";
import PageLoader from "./pageloader/pageloader";
import { Toaster } from "react-hot-toast";

function App() {
  const { isLoading } = useSelector((state) => state.loading);

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