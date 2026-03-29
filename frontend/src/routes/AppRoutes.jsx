import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "@/pages/home/Hero";
import About from "@/pages/home/About";
import Services from "@/pages/home/Services";
import Contact from "@/pages/home/Contact";
import MainLayout from "../layouts/MainLayout";

// 🔥 Landing Page Wrapper
const LandingPage = () => {
  return (
    
    <MainLayout>
      <Hero />
      <About />
      <Services />
      <Contact />
    </MainLayout>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Future Routes */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;