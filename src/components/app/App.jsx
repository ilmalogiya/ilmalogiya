import { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";
import Navbar from "../navbar/navbar";
import MainSection from "../main-section/main_section";
import Footer from "../footer/footer";
// import PostDetail from "../postDetail/postDetail";

function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/*" element={<MainSection />} />
        <Route path="/posts/:slug" element={<MainSection />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;