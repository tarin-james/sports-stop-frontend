import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa"; // for star icons
import { useAuctions, useFavorites } from "./auctionHooks";
import { useUser } from "../auth/AuthProvider";
import { updateUserFavorites } from "./auctionServices";

export function AuctionResults() {
  const [auctions, loading, error] = useAuctions();

  return (
    <div className="p-6">
      {loading ? (
        "Loading"
      ) : (
        <AuctionList initialAuctions={auctions}></AuctionList>
      )}
    </div>
  );
}

function AuctionList({ initialAuctions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState(initialAuctions);
  const { user, isLoggedIn } = useUser();
  const [favorites, setFavorites] = useFavorites(user?.id);

  // Toggle favorite status
  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    updateUserFavorites(user?.id, newFavorites).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    let items = [...initialAuctions];

    // Filter by search
    if (searchTerm) {
      items = items.filter((auction) =>
        auction.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by condition
    if (conditionFilter) {
      items = items.filter((auction) => auction.condition === conditionFilter);
    }

    // Sort
    if (sortOption === "highToLow") {
      items.sort((a, b) => b.currentBid - a.currentBid);
    } else if (sortOption === "lowToHigh") {
      items.sort((a, b) => a.currentBid - b.currentBid);
    } else if (sortOption === "az") {
      items.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredItems(items);
  }, [searchTerm, sortOption, conditionFilter, initialAuctions]);

  return (
    <>
      <label className="block mb-1 font-semibold">Search</label>
      <input
        type="text"
        className="w-full border px-4 py-2 rounded"
        placeholder="Auction Title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex">
        <div className="my-2">
          <label className="block mb-1 font-semibold">Sort</label>
          <select
            name="sort"
            className="border px-4 py-2 rounded"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Select</option>
            <option value="highToLow">Price (high to low)</option>
            <option value="lowToHigh">Price (low to high)</option>
            <option value="az">A-Z</option>
          </select>
        </div>
        <div className="m-2">
          <label className="block mb-1 font-semibold">Condition</label>
          <select
            name="condition"
            className="border px-4 py-2 rounded"
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="new">New</option>
            <option value="like new">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
      </div>

      {filteredItems.map((item) => (
        <div
          key={item._id}
          className="border p-4 my-2 flex justify-between items-center"
        >
          <div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="my-2">Current Bid: ${item.currentBid}</p>
            <Link
              to={`/auction/${item._id}`}
              className="bg-orange-300 text-black px-4 py-2 rounded"
            >
              Details
            </Link>
          </div>
          {isLoggedIn && (
            <button
              onClick={() => toggleFavorite(item._id)}
              className="text-yellow-500 text-2xl ml-4"
              title="Toggle Favorite"
            >
              {favorites?.includes(item._id) ? <FaStar /> : <FaRegStar />}
            </button>
          )}
        </div>
      ))}
    </>
  );
}
