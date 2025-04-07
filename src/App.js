import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LandingPage } from "./components/landing/LandingPage";
import { Layout } from "./components/layout/Layout";
import { AuctionResults } from "./components/auctions/AuctionResults";
import { AuctionDetails } from "./components/auctions/AuctionDetails";
import { Profile } from "./components/user/Profile";
import { AuctionCreate } from "./components/auctions/AuctionCreate";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auctions" element={<AuctionResults />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auction/:id" element={<AuctionDetails />} />
            <Route path="/create" element={<AuctionCreate />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
