import AppRoutes from "@/routes/AppRoutes";
import CookieBanner from "@/components/ui/CookieBanner";

function App() {
  return (
    <>
      <AppRoutes />
      <CookieBanner /> {/* ✅ GLOBAL */}
    </>
  );
}

export default App;