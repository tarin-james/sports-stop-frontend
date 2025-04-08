import axios from "axios";

export function fetchUser() {

  return axios.get("https://sports-stop.onrender.com/auth", {
    withCredentials: true,
  });
}

