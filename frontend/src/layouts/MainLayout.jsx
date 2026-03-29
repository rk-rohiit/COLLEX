import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";


const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;