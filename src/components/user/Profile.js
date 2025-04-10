import { Link } from "react-router-dom";
import { useFetchedFavorites, useUserAuctions } from "../auctions/auctionHooks";
import { useUser } from "../auth/AuthProvider";

export function Profile() {
  const { user } = useUser();
  const [userAuctions, userLoading, userError] = useUserAuctions(user?.id);
  const [favoriteAuctions, favoritesLoading, favoritesError] =
    useFetchedFavorites(user?.id);

  if (!user) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="flex justify-center ">
      <div className="p-6 max-w-6xl ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border p-4 rounded-lg shadow-md">
          {/* Left column: user avatar and name */}
          <div className="flex flex-col items-center justify-center md:col-span-1 border-r border-gray-200 pr-4">
            <img
              src={user.photos?.[0]?.value}
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
            <p className="mt-4 text-lg font-semibold">{user.displayName}</p>
          </div>

          {/* Right column: your auctions */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Your Auctions
            </h2>
            <div className="space-y-4">
              {/* Placeholder auction cards */}
              {userLoading
                ? "...loading"
                : userAuctions?.map((item) => (
                    <div
                      key={item}
                      className="flex items-center border rounded-md p-4"
                    >
                      <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md mr-4">
                        <img src={item.images}></img>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">
                          <Link to={`/auction/${item._id}`}>{item.title}</Link>
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      { !!favoriteAuctions?.length && 
      <div className="p-6 max-w-6xl">
        <div className="border p-4  rounded-lg shadow-md">
          {/* Right column: your auctions */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Your Favorites
            </h2>
            <div className="space-y-4">
              {/* Placeholder auction cards */}
              {favoritesLoading
                ? "...loading"
                : favoriteAuctions?.map((item) => (
                    <div
                      key={item}
                      className="flex items-center border rounded-md p-4"
                    >
                      <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md mr-4">
                        <img src={item.images}></img>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">
                          <Link to={`/auction/${item._id}`}>{item.title}</Link>
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}
