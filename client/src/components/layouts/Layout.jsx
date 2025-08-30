// Layout.jsx
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";

const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
