import axios from "axios";

export function fetchAuctions() {
  return axios.get("https://sports-stop.onrender.com/auctions");
}

export function fetchAuction(id) {
  return axios.get(`https://sports-stop.onrender.com/auctions/${id}`);
}
