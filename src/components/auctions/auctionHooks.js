import { useState, useEffect } from "react";
import { fetchAuctions, fetchAuction } from "./auctionServices";

export function useAuctions() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetchAuctions()
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return [data, loading, error];
}

export function useAuction(id, updated) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetchAuction(id)
      .then((response) => {
        setData(response.data?.[0]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [updated]);

  return [data, loading, error];
}
