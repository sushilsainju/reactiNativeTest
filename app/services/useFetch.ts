import { useEffect, useState } from "react";

export const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  autoFetch = true
): {
  data: T | null;
  error: Error | null;
  loading: boolean;
  isFetched: boolean;
  refetch: () => void;
  reset: () => void;
} => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const fetchData = async () => {
    console.log("Fetching data...");
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      setData(result);
      setIsFetched(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        console.error("Error fetching data:", err.message);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    setIsFetched(false);
    fetchData();
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
    setIsFetched(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return {
    data,
    error,
    loading,
    isFetched,
    refetch,
    reset,
  };
};

export default useFetch;
