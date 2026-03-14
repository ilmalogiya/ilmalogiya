import { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";
import Navbar from "../navbar/navbar";
import MainSection from "../main-section/main_section";
import Footer from "../footer/footer";
import Iqtiboslar from "../iqtiboslar/iqtiboslar";

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
        <Route path="/iqtiboslar" element={<Iqtiboslar />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;