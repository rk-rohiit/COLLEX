import React from "react";
import { useAuth } from "../context/AuthContext";
import { Layout } from "./layout/Layout";
import { AuthPage } from "./auth/AuthPage";
import { HomePage } from "./pages/HomePage";
import { ListingsPage } from "./pages/ListingsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ChatPage } from "./pages/ChatPage";
import { AdminPage } from "./pages/AdminPage";
import { CreateListingPage } from "./pages/CreateListingPage";
import { ListingDetailPage } from "./pages/ListingDetailPage";

function Router() {
  const { user, userProfile } = useAuth();
  const [currentPath, setCurrentPath] = React.useState("/");
  const [listingId, setListingId] = React.useState(null);

  React.useEffect(() => {
    const handleNavigation = (path, id) => {
      setCurrentPath(path);
      if (id) setListingId(id);
    };

    // Expose navigation globally
    window.navigateTo = handleNavigation;

    return () => {
      delete window.navigateTo;
    };
  }, []);

  if (!user || !userProfile) {
    return <AuthPage />;
  }

  if (!userProfile.verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-yellow-600 text-2xl">⏳</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Verification Pending
          </h2>
          <p className="text-gray-600 mb-4">
            Your account is being verified by our admin team. This usually takes
            24-48 hours.
          </p>
          <p className="text-sm text-gray-500">
            We'll send you an email once you're approved!
          </p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPath) {
      case "/":
        return <HomePage />;
      case "/listings":
        return <ListingsPage />;
      case "/create":
        return <CreateListingPage />;
      case "/listing":
        return <ListingDetailPage listingId={listingId} />;
      case "/chat":
        return <ChatPage />;
      case "/profile":
        return <ProfilePage />;
      case "/admin":
        return userProfile.role === "admin" ? <AdminPage /> : <HomePage />;
      default:
        return <HomePage />;
    }
  };

  return <Layout currentPath={currentPath}>{renderPage()}</Layout>;
}

export default Router;
