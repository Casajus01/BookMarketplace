import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import AddListing from "./pages/AddListing";
import BrowseListings from "./pages/BrowseListings";
import PurchaseConfirmation from "./pages/PurchaseConfirmation";
import TradeProposal from "./pages/TradeProposal";
import Wishlist from "./pages/Wishlist";
import UserReviews from "./pages/UserReviews";
import UserDashboard from "./pages/UserDashboard";
import VerifyListings from "./pages/VerifyListings";
import WelcomeScreen from "./pages/WelcomeScreen";
import NavBar from "./components/NavBar"; // ✅ import the NavBar
import MyListings from "./pages/MyListings";
import AdminListings from './pages/AdminListings';

function App() {
  const isAuthenticated = localStorage.getItem("token");
  const location = useLocation();

  // You can hide the navbar on login/signup if desired:
  const hideNav = ["/login", "/signup", "/landing", "/welcome"].includes(location.pathname);

  return (
    <div className="app-container">
      {!hideNav && <NavBar />} {/* ✅ NavBar shown unless on login/signup/landing */}

      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<WelcomeScreen />} />


        {/* Book listing features */}
        <Route path="/browse" element={<BrowseListings />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/my-listings" element={<MyListings />} />


        {/* Buying & trading */}
        <Route path="/purchase-confirmation" element={<PurchaseConfirmation />} />
        <Route path="/trade-proposal" element={<TradeProposal />} />

        {/* User-specific features */}
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/reviews" element={<UserReviews />} />
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* Admin */}
        <Route path="/verify-listings" element={<VerifyListings />} />
        <Route path="/admin/verify" element={<AdminListings />} />
      </Routes>
    </div>
  );
}

export default App;
