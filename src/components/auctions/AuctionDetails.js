import { useParams } from "react-router-dom";
import { useAuction } from "./auctionHooks";
import { useEffect, useState } from "react";
import axios from "axios";

export function AuctionDetails() {
  const { id } = useParams();
  const [bidUpdated, setBidUpdated] = useState(false);
  const [auction] = useAuction(id, bidUpdated);
  const [bidAmount, setBidAmount] = useState(auction?.currentBid);

  useEffect(() => {
    setBidAmount(auction?.currentBid);
  }, [auction]);
  console.log(auction);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const modifiedAuction = {
      ...auction,
      currentBid: bidAmount,
    };

    try {
      const res = await axios.put(
        `https://sports-stop.onrender.com/auctions/${id}`,
        modifiedAuction,
        {
          withCredentials: true,
        }
      );
      setBidUpdated((prev) => !prev);
    } catch (err) {
      console.error(err);
      alert("Error submitting bid.");
    }
  };

  if (!auction) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Image & Price */}
        <div className="flex flex-col items-center">
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
            {auction.images ? (
              <img src={auction.images}></img>
            ) : (
              <svg
                className="w-24 h-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 16l4-4a3 3 0 014.243 0L17 18M14 10h.01"
                />
              </svg>
            )}
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-800">
            ${auction.currentBid}
          </p>
        </div>

        {/* Right: Title, Description, Bid Form */}
        <div>
          <h2 className="text-2xl font-bold">{auction.title}</h2>
          <p className="text-gray-600 mt-2">{auction.description}</p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row items-center gap-4"
          >
            <input
              type="number"
              placeholder="Enter bid"
              className="border px-4 py-2 rounded w-full sm:w-auto"
              value={bidAmount}
              onChange={(e) => {
                if (e.target.value >= auction.currentBid)
                  setBidAmount(e.target.value);
              }}
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Bid
            </button>
            <button
              type="button"
              className="border px-6 py-2 rounded hover:bg-gray-100"
            >
              Reviews
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
