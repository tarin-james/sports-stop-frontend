import { useState, useEffect } from "react";
import {
  fetchAuctions,
  fetchAuction,
  fetchUserAuction,
  fetchUserFavorites,
  fetchFavoriteAuctions,
} from "./auctionServices";

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

export function useUserAuctions(authorId) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (authorId) {
      fetchUserAuction(authorId)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [authorId]);

  return [data, loading, error];
}

export function useFavorites(userId) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchUserFavorites(userId)
        .then((response) => {
          setData(response.data.favorites);
        })
        .catch(() => {
          console.log("error fetching favorites");
        });
    }
  }, [userId]);

  return [data, setData];
}

export function useFetchedFavorites(userId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [favoritesList] = useFavorites(userId);
  useEffect(() => {
    if (userId && favoritesList?.length) {
      fetchFavoriteAuctions(favoritesList)
        .then((response) => {
          setData(response.data);
          setLoading(false)
        })
        .catch((err) => {
          console.log("error fetching favorites");
          setError(err)
          setLoading(false)
        });
    } else {
      setLoading(false)
    }
  }, [userId, favoritesList]);
  return [data, loading, error];
}
