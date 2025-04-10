import { Link } from "react-router-dom";
import React from "react";
import { useUser } from "../auth/AuthProvider";

export function LandingPage() {
  const { isLoggedIn } = useUser();
  return (
    <div className="text-center p-10">
      <h2 className="text-2xl font-bold">Welcome to Sports Stop</h2>
      <p className="mt-4 text-gray-600">
        Buy and sell sporting goods in a dedicated auction platform.
      </p>
      <div className="mt-6">
        {isLoggedIn ? (
          <Link
            to="/create"
            className="bg-orange-300 text-black px-4 py-2 rounded mx-2"
          >
            Create an Auction
          </Link>
        ) : (
          <a
            className="bg-orange-300 text-black px-4 py-2 rounded"
            href="https://sports-stop.onrender.com/login"
          >
            Sign In
          </a>
        )}
        <Link to="/auctions" className="bg-yellow-200 px-4 py-2 rounded">
          View Auctions
        </Link>
      </div>
    </div>
  );
}
