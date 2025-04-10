import { Link } from "react-router-dom";
import React from "react";



export function LandingPage() {
  return (
    <div className="text-center p-10">
      <h2 className="text-2xl font-bold">Welcome to Sports Stop</h2>
      <p className="mt-4 text-gray-600">
        Buy and sell sporting goods in a dedicated auction platform.
      </p>
      <div className="mt-6">
        <button className="bg-orange-300 text-black px-4 py-2 rounded mx-2">
          Create an Auction
        </button>
        <Link to="/auctions" className="bg-yellow-200 px-4 py-2 rounded">
          View Auctions
        </Link>
      </div>
    </div>
  );
}
