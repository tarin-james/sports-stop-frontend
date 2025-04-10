import { Link } from "react-router-dom";
import { useUser } from "../auth/AuthProvider";

export function Header() {
  const { isLoggedIn } = useUser();
  return (
    <header className="p-4 bg-yellow-200 flex justify-between items-center">
      <Link to="/">
        <img className="w-32 h-18 object-contain" src="/sports-stop-logo.png" />
      </Link>
      <nav>
        <Link className="mx-2" to="/auctions">
          Auctions
        </Link>
        {isLoggedIn ? (
          <>
            <Link className="mx-2" to="/create">
              Create Auction
            </Link>
            <Link className="mx-2" to="/profile">
              Profile
            </Link>
            <a
              className="bg-orange-300 text-black px-4 py-2 rounded"
              href="https://sports-stop.onrender.com/logout"
            >
              Log out
            </a>
          </>
        ) : (
          <a
            className="bg-orange-300 text-black px-4 py-2 rounded"
            href="https://sports-stop.onrender.com/login"
          >
            Sign In
          </a>
        )}
      </nav>
    </header>
  );
}
