import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ElectricMotorbike from './pages/ElectricMotorbike';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import BookingPage from './pages/BookingPage';
import FloatingContact from './components/FloatingContact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/electric-motorbike" element={<ElectricMotorbike />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
      <Footer />
      <FloatingContact />
    </BrowserRouter>
  );
}

export default App;
