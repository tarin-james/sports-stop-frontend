import { useState, useEffect } from "react";
import { fetchUser } from "./authServices";

export function useUserInfo() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    fetchUser()
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setData(false);
        setError(error);
        setLoading(false);
      });
  }, []);

  return [data, loading, error];
}
