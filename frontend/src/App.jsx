import AppRoutes from "@/routes/AppRoutes";
import CookieBanner from "@/components/ui/CookieBanner";
import { useEffect, useState } from "react";
import Loader from "./components/ui/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // ⏱️ 1.5 sec loader

    return () => clearTimeout(timer);
  }, []);


  if (loading) return <Loader />;

  return (
    <>
      <AppRoutes />
      <CookieBanner /> {/* ✅ GLOBAL */}
    </>
  );
}

export default App;