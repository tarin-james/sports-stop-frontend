import axios from "axios";

export function fetchAuctions() {
  return axios.get("https://sports-stop.onrender.com/auctions");
}

export function fetchAuction(id) {
  return axios.get(`https://sports-stop.onrender.com/auctions/${id}`);
}

export function fetchUserAuction(authorId) {
  return axios.get(
    `https://sports-stop.onrender.com/auctions/user/${authorId}`
  );
}

export function fetchUserFavorites(userId) {
  return axios.get(
    `https://sports-stop.onrender.com/users/favorites/${userId}`
  );
}

export function updateUserFavorites(userId, favorites) {
  return axios.put(
    `https://sports-stop.onrender.com/users/favorites/${userId}`,
    {
      favorites,
    },
    {
      withCredentials: true,
    }
  );
}

export function fetchFavoriteAuctions(favoritesList) {
  return axios.post(
    `https://sports-stop.onrender.com/auctions/list`,
    {
      favoritesList,
    },
    {
      withCredentials: true,
    }
  );
}
