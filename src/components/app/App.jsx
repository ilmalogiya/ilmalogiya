import { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";
import Navbar from "../navbar/navbar";
import MainSection from "../main-section/main_section";
import Footer from "../footer/footer";
import Quotes from "../quotes/quotes";
import Author from "../quotes/author";
import SingleQuote from "../quotes/SingleQuote";

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
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/quotes/author/:slug" element={<Author />} />
        <Route path="/quotes/:slug" element={<SingleQuote />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;