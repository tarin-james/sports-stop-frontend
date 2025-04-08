import axios from "axios";

export function fetchUser() {
  const headers = {};
  const sessionCookie = getCookie("connect.sid");
  if (sessionCookie) headers["Cookie"] = `connect.sid=${sessionCookie}`;

  return axios.get("https://sports-stop.onrender.com/auth", {
    withCredentials: true,
    headers,
  });
}

const getCookie = (name) => {
  const cookies = document.cookie;
  const cookieArray = cookies.split(";");
  const cookie = cookieArray.find((cookie) =>
    cookie.trim().startsWith(name + "=")
  );
  return cookie ? cookie.split("=")[1] : null;
};
