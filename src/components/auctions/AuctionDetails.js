import { useParams } from "react-router-dom";
import { useAuction, useFavorites } from "./auctionHooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../auth/AuthProvider";
import { FaRegStar, FaStar } from "react-icons/fa";
import { updateUserFavorites } from "./auctionServices";
import CountdownTimer from "../shared/CountDownTimer";

export function AuctionDetails() {
  const { id } = useParams();
  const [bidUpdated, setBidUpdated] = useState(false);
  const [auction] = useAuction(id, bidUpdated);
  const [bidAmount, setBidAmount] = useState(auction?.currentBid);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(true);

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
    setBidAmount(auction?.currentBid);
  }, [auction]);

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
              <img src={auction.images} className="max-h-[250px] max-w-[350px] object-contain" />
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
              disabled={isExpired}
              type="submit"
              className={`px-6 py-2 rounded ${
                isExpired
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Bid
            </button>
            {isLoggedIn && (
              <button
                onClick={() => toggleFavorite(auction._id)}
                className="text-yellow-500 text-2xl ml-4"
                title="Toggle Favorite"
                type="button"
              >
                {favorites?.includes(auction._id) ? <FaStar /> : <FaRegStar />}
              </button>
            )}
          </form>
          <CountdownTimer
            targetDate={auction.datePosted}
            durationInHours={auction.duration}
            setTimerExpired={setIsExpired}
          />
        </div>
      </div>
      <div className="p-6 max-w-6xl ">
        <div className="border p-4 rounded-lg shadow-md">
          <div className="mb-4 border-b pb-2 flex justify-between">
            <h2 className="text-xl font-semibold">Comments</h2>
            {isLoggedIn && <button
              type="submit"
              className="bg-orange-300 text-black px-6 py-2 rounded hover:bg-orange-400"
              onClick={() => {
                setCommentModalOpen(true);
              }}
            >
              Add Comment
            </button>}
          </div>
          {auction?.comments?.map((comment) => {
            return <Comment {...comment}></Comment>;
          })}
        </div>
      </div>
      {commentModalOpen && (
        <CommentModal
          setCommentsUpdated={setBidUpdated}
          auction={auction}
          setOpen={setCommentModalOpen}
        ></CommentModal>
      )}
    </div>
  );
}

export function CommentModal({ auction, setOpen, setCommentsUpdated }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useUser();

  const handleSubmit = async () => {
    const newCommentObj = {
      text: newComment,
      author: user.displayName,
      authorImg: user?.photos?.[0]?.value,
    };

    const modifiedAuction = {
      ...auction,
      comments: [...(auction?.comments || []), newCommentObj],
    };

    try {
      const res = await axios.put(
        `https://sports-stop.onrender.com/auctions/${auction._id}`,
        modifiedAuction,
        {
          withCredentials: true,
        }
      );
      setCommentsUpdated((prev) => !prev);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error submitting comment.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4 ">Add Comment</h2>
        <textarea
          className="border p-4 w-full h-32 rounded mb-4"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="flex justify-between">
          <button
            onClick={() => setOpen(false)}
            className="bg-yellow-200 text-black px-6 py-2 rounded hover:bg-yellow-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-orange-300 text-black px-6 py-2 rounded hover:bg-orange-400"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export function Comment({ text, author, authorImg }) {
  return (
    <div className="flex items-start space-x-4 p-4 border-b last:border-0">
      {/* Author Image */}
      <img
        src={authorImg}
        alt={author}
        className="w-12 h-12 rounded-full border-2 border-gray-300"
      />

      {/* Comment Text */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          {/* Author Name */}
          <p className="font-semibold text-gray-800">
            {author || "Anonymous User"}
          </p>
        </div>

        {/* Comment Body */}
        <p className="mt-2 text-gray-600">{text}</p>
      </div>
    </div>
  );
}
